---
layout: learn_article
date: 2021-12-08
categories: Administration
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/permissions/strategy
---

This article offers some strategies to consider as you think about how to structure permissions in Metabase. A **permissions structure** refers to the combination of databases and collections of questions, models, and dashboards that people create in Metabase, and the level of access to these resources that you grant to different groups of people.

We're not telling you what you should do, but instead offering suggestions to keep in mind as you build and refine an overall permissions strategy, followed by [three example strategies](#example-permissions-structures) to consider. It may take some experimentation, but your goal should be to find the simplest solution that will work for your organizational structure and security needs.

If you're looking for an overview of how permissions work in Metabase, check out our [documentation](/docs/latest/administration-guide/05-setting-permissions).

## The basics of structuring permissions

Your permissions structure lies at the intersection of three moving parts:

1. The collections you build in Metabase
2. How groups in Metabase map to your org chart
3. Your underlying data warehouse

### Default permissive or default restrictive

Based on sector and company culture, most organizations will either default to a permissive or restrictive starting point. Now this isn't a setting you choose somewhere in Metabase, but rather a framework to think about when structuring your permissions. Do you start with all data and dashboards open and restrict as needed? Or does your organization need to restrict all data from the get-go, and only open up access to dashboards and questions on a need-to-know basis?

If you aren't sure, [keep it simple](#simple-is-best) for starters with a default permissive stance, so that everyone can have access to the data they need — as long as you're keeping sensitive info locked down.

### Security and compliance

If your organization handles medical, financial, or similarly sensitive data, you have hard constraints that you must adhere to when creating data and collection permissions. In these scenarios, discoverability in Metabase has to take a backseat to security and compliance.

## How to approach permissions

At a high level, this process should look something like this:

1. Divide your organization up into groups. These groups may map directly to [your org chart](#org-chart-based-permissions), fall along the lines of [the roles that different employees perform](#attribute-based-permissions), or into tiers of access (like security clearances).
2. Within each group, figure out what [questions](/docs/latest/questions/introduction) and [dashboards](/docs/latest/users-guide/07-dashboards) people need to see to do their jobs, and create them if you haven't already (or have them create their own stuff).
3. Identify what each group needs to have self-service access to, and make sure they can curate those [collections](/docs/latest/administration-guide/06-collections).
4. Pinpoint and restrict any data that you need to keep tightly controlled within your organization for security or legal compliance reasons.
5. Evaluate and refine your Metabase groups and permissions on a regular basis.

### Simple is best

It's a good idea to keep your Metabase permissions as simple as possible within the constraints of your organization's security and access needs. Put simply, people are more productive when they have access to a wide array of tools and information. The more levels of permissions you have, the more complex enforcing gets. It's important to find ways to segment sensitive data without breaking browsability and organization, so try to make things work with as few groups as possible, as few groups will be more straightforward to maintain over time. A simple and self-explanatory permissions structure can also make things easier in the event of staff turnover. If a single administrator puts together a convoluted system for granting collection permissions and then leaves the company, remaining employees may not know how to pick up the pieces.

### Expect to change your strategy

Your needs will change, so check in on a quarterly basis to evaluate how your permissions structure is working. Are people at your organization able to access the questions and dashboards they need to do their jobs? Is your sensitive data locked down?

## Example permissions structures

Now that we've covered what and how to keep in mind when developing your permissions strategy, let's dig into a few different approaches that your organization can take depending on your size, structure, and security needs.

### Org chart-based permissions

The simplest, most straightforward option — and where most companies will want to start off — is mapping groups and collections in Metabase to your existing organizational chart. If you have Marketing and Accounting departments, create corresponding Marketing and Accounting groups, as well as collections that hold saved questions and dashboards for Marketing and Accounting needs.

In this scenario, everything that a person needs to do their job can be traced directly to the group they're in. People in the Marketing department (and by extension, group) can edit the Marketing collection, which can be viewed — but not edited — by the Accounting department. You'll likely need sub-collections to house more specific Marketing needs — say, saved questions related to a specific campaign. If those subfolders contain sensitive information, you can restrict them, and Accounting won't see them at all. You'll need to set permissions on each collection and sub-collection to make sure they're accessible to those who need them — see [this article](collection-permissions) to learn more about that process.

Org chart-based permissions, where top-level collections are readable by everyone and writable by some, with hidden sub-collections as needed, are a great start for most organizations. This structure is most effective when each person belongs to a single group. As your organization grows more complex, you may find org-chart-based permissions cumbersome, especially if you're big on cross-departmental collaboration. If that's the case, you may want to consider an attribute-based approach to Metabase permissions.

### Attribute-based permissions

Attribute-based permissions may be useful if your organization adheres to a matrix-style organizational structure, where people regularly work in pods or across teams. If this is the case, and you've found that one group per person is no longer cutting it, mapping your groups to functions may be more effective.

Let's say you have a new employee. They're an analyst, will be working on a specific marketing campaign, and will need access to underlying event data. These three attributes can't be cleanly captured by a simple departmental group mapping, so instead, you can create groups that begin to mirror functions rather than places in the org chart. Since people can belong to multiple groups in Metabase, this route offers more flexibility for crafting permissions solutions on a more granular level.

### Onion ring permissions

A third model to consider involves thinking of your permissions structure like an onion, with different rings or layers representing the breadth of access to collections. A simple example would be a company where everything is transparent and editable by all, except for one layer (or collection) within that is only accessible by executives and HR personnel. Approaching permissions with this onion ring model in mind can help you consider the _depth_ of access that each person or group in your organization needs.

## Further reading

- [Permissions overview](/docs/latest/administration-guide/05-setting-permissions)
- [Data permissions](/docs/latest/administration-guide/data-permissions)
- [Collection permissions](/docs/latest/permissions/collections#setting-permissions-for-collections)
- [Managing people in Metabase](/learn/metabase-basics/administration/administration-and-operation/managing-people)
- [Keeping your analytics organized](/learn/metabase-basics/administration/administration-and-operation/same-page)
- [Metabase at scale](/learn/metabase-basics/administration/administration-and-operation/metabase-at-scale)
- [Data sandboxing](/docs/latest/enterprise-guide/data-sandboxes)
