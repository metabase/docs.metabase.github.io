import React, { Component } from "react";
import { render } from "react-dom";

/// Instance storage

const HOST_BLACKLIST = ["www", "static", "downloads", "discourse", "stats"];
const DEFAULT_DOMAIN = "metabaseapp.com";
const VALID_HOST = new RegExp(
  "^[a-zA-Z0-9_-]{1,63}\\." + DEFAULT_DOMAIN.replace(".", "\\.") + "$",
);

function getUrlInstance(url = window.location) {
  const params = new URLSearchParams(url.search);
  return params.get("instance");
}

function getStoredInstances() {
  try {
    const cloudInstances = localStorage.getItem("metabaseCloudInstances");
    if (cloudInstances === null || cloudInstances.length === 0) {
      return [];
    }

    return JSON.parse(cloudInstances);
  } catch (err) {
    console.error(err);
  }

  return [];
}

function saveInstances(instances) {
  try {
    localStorage.setItem("metabaseCloudInstances", JSON.stringify(instances));
  } catch (err) {
    console.error(err);
  }
}

function isValidInstanceHost(hostname) {
  if (!hostname) {
    return false;
  }
  const instanceName = hostname.split(".")[0];
  return !HOST_BLACKLIST.includes(instanceName) && VALID_HOST.test(hostname);
}

function addInstance(hostname) {
  // No host
  if (!hostname) {
    return null;
  }

  // Append default domain to host
  if (!hostname.endsWith(`.${DEFAULT_DOMAIN}`)) {
    hostname = `${hostname}.${DEFAULT_DOMAIN}`;
  }

  // Valid?
  if (!isValidInstanceHost(hostname)) {
    throw new Error(`Invalid instance hostname: ${hostname}`);
  }

  // Save host
  const instances = getStoredInstances();
  if (hostname !== null && hostname !== "" && !instances.includes(hostname)) {
    saveInstances([hostname].concat(instances));
  }

  return hostname;
}

function forwardToHost(instanceHost) {
  if (isValidInstanceHost(instanceHost)) {
    window.location = `https://${instanceHost}`;
  }
}

/// React components

class AddInstanceInput extends Component {
  constructor(props) {
    super(props);

    this.state = { errorMessage: null };
  }

  onInputChange() {
    if (this.state.errorMessage !== null) {
      this.setState({ errorMessage: null });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    try {
      const hostnameValue = e.target.querySelector("#hostname").value;
      const hostname = addInstance(hostnameValue);
      forwardToHost(hostname);
      this.setState({ errorMessage: null });
    } catch (err) {
      this.setState({ errorMessage: err.message || null });
    }
  }

  render() {
    return (
      <form action="#" onSubmit={this.onSubmit.bind(this)}>
        <input
          autoFocus
          id="hostname"
          type="text"
          placeholder="DNS alias"
          onChange={this.onInputChange.bind(this)}
          onInput={this.onInputChange.bind(this)}
        />
        <span>.{DEFAULT_DOMAIN}</span>

        <button type="submit">Go</button>

        <div>
          <p>{this.state.errorMessage}</p>
        </div>
      </form>
    );
  }
}

class InstanceListItem extends Component {
  render() {
    const { instance } = this.props;

    const prefix = instance.split(".")[0];
    const suffix = instance
      .split(".")
      .splice(1)
      .join(".");

    return (
      <li key={instance}>
        <a href={`https://${instance}`}>
          <strong>{prefix}</strong>
          <em>.{suffix}</em>
          <img src="/images/chevron.svg" />
        </a>
      </li>
    );
  }
}

class InstanceSelect extends Component {
  constructor(props) {
    super(props);

    const { instances } = props;

    this.state = {
      instances: instances,
      renderHostInput: !!(instances.length === 0),
    };
  }

  onTrySomethingElseClick() {
    this.setState({ renderHostInput: true });
  }

  render() {
    const { instances, renderHostInput } = this.state;

    // Instances list
    if (!renderHostInput) {
      const title =
        instances.length > 1
          ? "You've used these Metabase Cloud accounts:"
          : "You've used this Metabase Cloud account:";
      return (
        <div>
          <div className="container">
            <h2>{title}</h2>
            <ul>
              {instances.map((inst, index) => (
                <InstanceListItem key={index} instance={inst} />
              ))}
            </ul>
            <div id="Cloud-Login-Alt" className="border-top text-center">
              Not this?{" "}
              <a
                className="fw-700"
                href="#"
                onClick={this.onTrySomethingElseClick.bind(this)}
              >
                Try something else.
              </a>
            </div>
          </div>
        </div>
      );
    }

    // Add an instance
    return (
      <div>
        <div className="container">
          <h1>Find your account</h1>
          <p>If you remember the URL of your Metabase Cloud, enter it here:</p>
          <AddInstanceInput />
          <p>
            <strong>
              If not, check in your invitation email for a login link, or ask
              your local Metabase Admin for help.
            </strong>
          </p>
        </div>
        <div className="container border-top--light">
          <p>
            Want to manage your Metabase Cloud account and billing?{" "}
            <a
              className="fw-700"
              href="https://store.metabase.com"
              title="Log in to Store"
            >
              Log in to Store
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
}

/// Main

function main() {
  const added = addInstance(getUrlInstance());
  if (added) {
    forwardToHost(added);
  }

  render(
    <InstanceSelect instances={getStoredInstances()} />,
    document.getElementById("Cloud-Login-Box"),
  );
}

main();
