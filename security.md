---
layout: centered_content
toc: true
checked-list: true
title: "We don’t want your data."
summary: "Yes, we think everyone should be able to explore and learn from data. But we also think you should keep it all to yourself."
categories: Security
image: /images/security/preview.jpg
---

## [Introduction](#introduction)

### The beginning: open source, in-database analytics

From the very beginning, we’ve built Metabase to treat your data the way we’d want ours treated—private and secure.
To accomplish this, we got our start with open source, in-database analytics. That means:

- **Your data stays on your servers—and in your control.** We never look at or copy your data. Period.
- **You can always look under the hood of our project.** No black boxes here.
- **On-site or [air-gapped deployments](/product/air-gapping) aren’t an afterthought.**

Although we offer (clearly marked and completely optional) ways to share anonymized usage data, most people’s open-source instances never need to call into us at all, and we take great care to never see anyone’s data.

Never seeing your data is only part of the solution. We’ve also built detailed privacy and security features to secure data access within your organization, including finely-grained permissions controls and support for SSO.

### Cloud without compromises

We’ve always known we wanted to make it easier for people to use Metabase. When we decided it was time to offer cloud-hosted plans, we also knew we wanted to bring the same commitment to data security and privacy to these plans.

To accomplish that, we designed our hosted plans with an architecture designed to support that commitment.

{% include image_and_caption.html url='/images/security/metabase-cloud-architecture-mobile.jpg' url_md='/images/security/metabase-cloud-architecture-desktop.jpg' description="Metabase cloud architecture" %}

- **Starter instances of Metabase are just that—our open-source project conveniently bundled with its own hosting.** There’s some minor tweaks around the edges, but for the most part, it’s everything you love about open-source Metabase with additional convenient hosting. You can even keep it in the neighborhood, with cloud-hosting options in the US, Europe, Latin America, and Asia-Pacific.
- **We’ve designed our architecture to prioritize isolation:** Each of our hosting customers have their own containers, with no shared clusters. That means requests to your Metabase instance are your requests.
- **Just like in our open-source offerings, we still very much don’t want to see your data.** We keep as much of it as possible on your servers, and what we do touch, we encrypt in transit and hash any identifiable data. That means that unless you enable results caching, none of the data returned by your database is stored on our end, and we never see that content.

Our hosted plans come with the same opt-in options for sharing anonymized usage data and the same privacy and security features to help you secure access within your organization.

## [Enterprise grade compliance](#enterprise-grade-compliance)

{% include section-with-image.html url='/images/SOC-2-Badge.png' title="SOC 2 Type II" description="Our SOC 2 Type II report attests to the controls we have in place governing the security of customer data as they map to Trust Service Principles (TSPs) established by the American Institute of Certified Public Accountants (AICPA)." %}

{% include section-with-image.html url='/images/security/badge_EU.png' title="General Data Protection Regulation" description="At Metabase, we’ve worked to make our products, processes, and procedures GDPR-compliant." %}

{% include section-with-image.html url='/images/security/badge_CCPA.png' title="California Consumer Privacy Act (CCPA)" description="Metabase acts as a service provider to customers under the California Consumer Privacy Act (CCPA), and we support our customers’ compliance with the CCPA." %}

## [Data privacy](#data-privacy)

### Data sharing and processing

- Metabase follows GDPR and CCPA guidelines to ensure data protection obligations to our customers. This includes only collecting, processing, and storing customer data in compliance with these obligations and providing you the right to access or delete it at any time.

- Metabase provides controls for deleting customer data when it is no longer needed for a legitimate business purpose and also provides users the option to opt-out of tracking cookies on our website.

- Metabase also requires our data processing vendors to certify the use of customer data for no other purposes than the provision of services.

### Data disposal

- As a customer, you can request buyer-related data deletion at any time.
- Instance-related data is removed automatically after a period of inactivity.
- Metabase’s hosting providers maintain industry standard security practices for ensuring removal of data from storage media.

### Vendor management

- Metabase has established agreements that require subprocessors to adhere to confidentiality commitments and take appropriate steps to ensure our security posture is maintained.
- Metabase monitors these sub-processing vendors by conducting reviews of their controls before use and at least annually.

## [Penetration testing and vulnerability disclosure](#penetration-testing-and-vulnerability-disclosure)

### Penetration testing

- In addition to our compliance audits, Metabase engages independent entities to conduct application-level and infrastructure-level penetration tests at least twice per year.
- Results of these tests are prioritized, and remediated in a timely manner, and shared with senior management.
- Customers may receive executive summaries of these activities by requesting them from their success team representative.

### Vulnerability disclosure

- Our engineering processes integrate a real-time vulnerability scanner.
- Metabase is committed to working with security experts across the world to stay up to date with the latest security techniques. We publish our security advisories on Github.

## [Access management, encryption, and endpoint security](#access-management-encryption-and-endpoint-security)

### Access management

- Metabase adheres to the principles of least privilege and role-based permissions when provisioning access; workers are only authorized to access data that they reasonably must handle in order to fulfill their current job responsibilities.
- Metabase requires personnel to use an approved password manager.

### Encryption

- Metabase encrypts data using industry standard protocols.
- Data in transit is encrypted using TLS 1.2 or higher.
- Sensitive data, like connection strings and settings, is encrypted at row-level with AES256 + SHA512. Additionally AWS also encrypts the disks where data is written.
- Key management is in place for encryption keys for production services.

### Endpoint Security

- All workstations issued to Metabase personnel are configured by Metabase to comply with our standards for security.
- These standards require all workstations to be properly configured, updated, and tracked and monitored by Metabase’s endpoint management solutions.
- Metabase’s default configuration sets up workstations to encrypt data at rest, have strong passwords, and lock when idle.
- Workstations run up-to-date monitoring software to report potential malware.

## [Network security & system monitoring](#network-security--system-monitoring)

### Network security and server hardening

- Metabase segments its systems into separate networks with modern, restrictive firewalls between networks to better protect sensitive data.
- Testing and development systems are hosted in a separate network from production infrastructure systems.
- All servers within our production fleet are hardened according to industry standard CIS benchmarks.
- Network access to Metabase’s production environment from open, public networks is restricted, with only the load balancers accessible from the Internet.
- Metabase logs, monitors, and audits all system calls, and has alerting in place for calls that indicate a potential intrusion or exfiltration attempt.

### System monitoring, logging, and alerting

- Metabase monitors infrastructure of servers and workstations to gain a comprehensive view of the security state.
- Administrative access, use of privileged commands, and system calls on all servers in Metabase’s production network are logged and monitored.
- Analysis of logs is automated to detect potential issues and alert responsible personnel.

## [Disaster recovery & incident response](#disaster-recovery--incident-response)

### Disaster recover and business continuity plan

- Metabase utilizes services deployed by its hosting provider to distribute production operations across separate availability zones. These distributed zones protect Metabase’s service from loss of connectivity, power infrastructure, and other common location-specific failures.
- Metabase performs daily backups and replication for its core databases across these zones and supports restore capability to protect the availability of Metabase’s service in the event of a site disaster affecting any of these locations.
- Full backups are saved at least once per day and transactions are saved continuously.
- Metabase tests backup and restore capabilities annually to ensure successful disaster recovery.

### Responding to security incidents

- Metabase has established policies and procedures for responding to potential security incidents.
- All security incidents are managed by Metabase’s dedicated Incident Response Team. The policies define the types of events that must be managed via the incident response process and classifies them based on severity.
- In the event of an incident, affected customers will be informed via email from our customer success team. Incident response procedures are tested and updated at least annually.
