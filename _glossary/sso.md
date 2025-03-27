---
title: "SSO"
headline: "SSO"
def: "An authentication (auth) setup that lets people use one login to access independent apps."
aka:
  - Single sign-on
key-article:
  title: Set up SSO in your Metabase
  url: /learn/metabase-basics/administration/administration-and-operation/managing-people#3-set-up-sso-in-your-metabase
related-terms:
  - term: SAML
    slug: saml
  - term: LDAP
    slug: ldap
further-reading:
  - title: Enabling Google Sign-in
    url: /docs/latest/people-and-groups/google-sign-in
  - title: Using LDAP for authentication and access control
    url: /learn/permissions/ldap-auth-access-control
  - title: Embed Metabase in your app to deliver multi-tenant, self-service analytics
    url: /learn/embedding/multi-tenant-self-service-analytics
---

## What is SSO?

**SSO** is an authentication (auth) setup that lets people use one login to access independent apps. It’s a bit like using your passport to get into different countries. With SSO, you don’t need to use one login for each account, just as you don’t need to travel with different pieces of ID specific to each country.

For example, you might have two different logins that are used with two different sign-in pages for your email and your online banking. If the IT teams at your email provider and bank each set up SSO, you would be able to use one sign-in page and login to access both websites.

{% include image_and_caption.html url='/glossary/images/sso/google-sign-in.png' description="<em>Fig. 1</em>. You'll probably recognize this <strong>Sign in with Google</strong> prompt from other apps. This is an example of SSO set up with Google sign-in." %}

## How does SSO work?

Since digital authentication can’t be done in person, your identity on the internet is checked by a service that asks you for proof of something you know (like a password), or proof of something you physically have (like sending a code to your phone). These pieces of proof are called _identity factors_.

The most common way to authenticate is through a single identity factor, such as a password. If you add another factor, like a phone number, you get two-factor authentication (2FA). Naturally, you can continue adding factors, (an email, a verification app, etc.), to get multi-factor authentication (MFA).

Instead of using information that _you_ know or have, SSO uses an identity factor called an _authentication token_ that belongs to the SSO provider. An authentication token is a unique, anonymous piece of information that's generated when you sign in to the SSO provider.

The token is temporarily stored in your browser (like a browser cookie) or on the provider’s servers, and is only valid for a period of time — usually until you close the browser, or within an expiry window set by your security team.

When you go to an app that is set up with SSO, it'll automatically ask for the authentication token from the SSO provider, instead of asking you to log in. If the token is still valid (you’ve signed in to the SSO provider in the same session, and it hasn’t expired), your identity is considered authenticated, and you'll be allowed into the app. If the token has become invalid, you'll be prompted to sign in with the SSO provider to create a fresh one.

## Where does SSO fit into the bigger picture?

Authentication only deals with who you are (identity). From there, other services keep track of where you are allowed to go, and what you can do once you get there (access management).

Identity and access management (IAM) is the umbrella term for these tools and processes. SSO and other parts of an IAM toolkit are often packaged up by identity providers (IdPs), such as [Okta](https://www.okta.com/products/single-sign-on/), [Auth0](https://auth0.com/single-sign-on/), or [OneLogin](https://www.onelogin.com/product/sso), and implemented as part of cloud security.

## SSO in Metabase

Setting up SSO in Metabase means that people won’t need to create a separate Metabase username and password to access your organization’s data. They can simply log in through the same account as your chosen identity provider. The open-source edition of Metabase can be set up with Google SSO or [LDAP](/glossary/ldap).

Pro and Enterprise editions of Metabase work with [SAML](/glossary/saml) and [JWT](/glossary/jwt) standards (in addition to Google SSO and LDAP). SSO can also be combined with [data sandboxing](/glossary/data_sandbox) in Metabase Pro and Enterprise plans to define the data that people can see and interact with, based on user [attributes](/glossary/attribute) such as their department or role.
