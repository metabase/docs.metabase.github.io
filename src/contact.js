import React, { Component } from 'react'
import { render } from 'react-dom'
import cx from 'classnames'
import 'es6-promise'
import 'isomorphic-fetch'
import Icon from 'react-geomicons'


const endpoint = 'https://services.metabase.com/api/v1/crm/contact-request'

class Contact extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: false,
      valid: false,
      submitted: false,
      validationErrors: [],
      values: {
        name: null,
        email: null,
        company: null,
        ip: null,
        interested_in: null,
        message: null,
      }
    }
    this.updateValue = this.updateValue.bind(this)
    this.submit = this.submit.bind(this)
    this.requiredFields = ['name', 'email', 'company', 'message'];
  }

  componentDidMount () {
    this.fetchIP()
  }

  fetchIP() {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then(({ip}) => this.updateValue('ip', ip))
  }

  submit (ev) {
    ev.preventDefault()
    const validationErrors = [];
    this.requiredFields.forEach((field) => {
      if (!this.state.values[field]) {
        validationErrors.push(field);
      }
    });
    this.setState({ validationErrors });
    if (validationErrors.length > 0) {
      return;
    }

    fetch(endpoint, {
      mode: 'no-cors',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.values)
    })
    .then((response) => {
      if(response.status >= 400) {
        this.setState({ error: true })
      }
      this.setState({ submitted: true })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  updateValue (identifier, value) {
    this.setState({ values:  Object.assign({}, this.state.values, {
        [identifier]: value
    })})
  }



  render () {
    const { values } = this.state
    const fieldClasses = "input block full mb1"
    return (
      <div>
        { this.state.submitted? (
          <SuccessMessage service={values.interested_in}/>
        ) : (
          <div>
            <h4>Get in touch!</h4>
            { this.state.validationErrors.length > 0 &&
              <div className="text-white bg-red rounded py2 px2 mb2">
                Missing required fields: &nbsp;
                 { this.state.validationErrors.join(", ") }
              </div>
            }
            <form onSubmit={this.submit}>
                <input
                  type="text"
                  className={cx(fieldClasses, { fieldErrorClasses: this.state.validationErrors.includes('name')})}
                  placeholder="Your full name"
                  value={values.name}
                  onChange={ ({target}) => this.updateValue('name', target.value) }
                  required
                />

                <input
                  type="email"
                  className={cx(fieldClasses, { fieldErrorClasses: this.state.validationErrors.includes('email')})}
                  placeholder="Your email address"
                  value={values.email}
                  onChange={ ({target}) => this.updateValue('email', target.value)}
                  required
                />

                <input
                  className={cx(fieldClasses, { fieldErrorClasses: this.state.validationErrors.includes('company')})}
                  type="text"
                  placeholder="Company name"
                  value={values.company}
                  onChange={({target}) => this.updateValue('company', target.value)}
                  required
                />

              <h5>What kind of services are you interested in?</h5>
              <div className="Select mb1">
                <select onChange={({target}) => this.updateValue('interested_in', target.value)} required defaultValue="Choose a service">
                  <option>Choose a service</option>
                  <option>Paid Support</option>
                  <option>Metabase Partner Program</option>
                  <option>Hosting</option>
                  <option>Press Inquiry</option>
                  <option>Other services</option>
                </select>
              </div>

              <textarea
                value={values.message}
                className={cx(fieldClasses, { fieldErrorClasses: this.state.validationErrors.includes('message')})}
                maxLength="2000"
                placeholder={`Give us a few more details about your ${values.interseted_in ? values.interested_in.toLowerCase() : '' } needs.`}
                onChange={({target}) => this.updateValue('message', target.value)}
                required
              />

              <button className="Button Button--primary trackSubmission" type="submit" tabIndex="0">Submit</button>
            </form>
          </div>
        )}
      </div>
    )
  }
}

const SuccessMessage = ({service}) =>
  <div className="ContactSuccess">
    <div className="ContactSuccess-icon">
      <Icon fill='#fff' name="check" width={32} height={32} />
    </div>
    <div>
      <h5>Thanks for contacting us about {service}</h5>
      <p>Someone will be in touch soon.</p>
    </div>
  </div>

render(
  <Contact />,
  document.querySelector('#contact')
)
