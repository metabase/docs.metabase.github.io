---
title:  "Running Metabase on AWS Lightsail"
redirect_from:
  - /community_posts/running-metabase-on-aws-lightsail
meta_description: Read a step by step guide on how to install the AWS Lightsail instance, using Docker, and connecting Metabase to the PostgreSQL database.
date:   2022-03-01 10:10:58
image: /images/community/running-metabase-on-aws-lightsail.jpg
read_time: 5 minutes
category_filters: "Working with Metabase"
organization: Catalyst IT
organization_url: https://catalyst-it.co.uk/
author: Percy Musaka
author_img: /images/community/Persevierance-Musaka.jpeg
author_bio: Percy is a software engineer at Catalyst IT, an IT solutions business. He wanted to be a pilot until he wrote his first "hello world" in C, the beginning of a beautiful relationship between man and machine. You can find Percy on Twitter at [@VaMusaka](https://twitter.com/VaMusaka){:target="_blank"}.
---

![a scheme of the set up](/images/community/percy-1.png)

I have searched the Internet for a simple (open source) analytics platform that can be integrated with many data sources including MongoDB in particular. Also important to me was the interactivity and embedded analytics capabilities of the tools l looked into. I found Metabase to tick all the boxes and their pricing and open source offering made this even more attractive.

Having played around with Docker before, I decided to test Metabase and look around using a local version. I managed to get this running in a matter of minutes. After asking a couple of questions in Metabase it quickly became clear that I needed a production version. To continue exploring without losing any of the work I had 2 options as recommended in the install documentation: saving the data on mapped file storage or using a PostgreSQL database. I opted for the database option as it seemed simple enough.

Although the tutorial for deploying a new version of Metabase on Elastic Beanstalk is very extensive, I decided to go in a different direction. I opted to run Metabase on an AWS Lightsail Ubuntu instance. The reason for this was simply that AWS Lightsail has always been a lot less intimidating as compared to Amazon Elastic Compute Cloud (EC2) or the Metabase recommended Elastic Beanstalk. I have always found it easier to manage instances, networking as well as storage compared to EC2 or any other cloud computing providers.

In this article, l go over the steps I followed to install the AWS Lightsail instance, using Docker, and connecting Metabase to the PostgreSQL database. I will also describe the hurdles that l faced during the installation and provide some workarounds.

**Prerequisites:**

This article assumes some knowledge of the different technologies below although not essentials.

**AWS Lightsail**: A way to build applications and websites fast with low-cost, pre-configured cloud resources. We will use this to host Docker container with Metabase and also as a host for the PostgreSQL database.

**Docker**: A software platform that allows you to build, test, and deploy applications quickly. This will be used to run the Metabase application.

**PostgresSQL**: A powerful, open-source object-relational database that we will use to store out Metabase (meta) data and configurations. This will allow us to update turn off and rebuild the docker container without losing our data.

**Metabase**: An open source business intelligence tool that lets you create charts and dashboards using data from a variety of databases and data sources.

Below are the steps I followed:

### Create an AWS Account

Go to AWS Console and create an account if you do not already have one. For new users, Amazon provides a free tier where you can create some resources for free without paying anything for the first year of usage.

### Create an AWS Lightsail instance

Once your account is ready, head over to the Amazon Lightsail.

1. On the Lightsail page create a new instance by clicking the Create Instance button.
![Amazon LightSail](/images/community/percy-musaka-1.png)
2. Choose the instance location closest to you.
3. Pick your instance image.

    - Select platform Linux/Unix;
    - Select a blueprint Ubuntu 20.04 LTS;
    - Create an SSH key if you do not already have one;

4. Choose your instance plan.

    - To get started l would recommend selecting the `2gb Ram, 1vCPU, 60gb SSD` instance. (at the time of this article’s publication, Amazon is offering three months free on this instance size)

5. Identify your instance.

    - Give your resource a unique name.

6. Once you are happy with your settings, create an instance.
7. When you create your instance take note of the Public IP that is attached to your instance. You will need this to check your installation of Metabase at the end of the installation. You can get this IP following the steps outlined in the article IP addresses in Amazon Lightsail.

NOTE: Downloading the article’s directory with `install.sh` should take care of all the steps described below without needing any extra configurations.
This script will install Docker, PostgreSQL, set up the database user, enable Docker access to the database, install and run the Metabase container.
To install with this method simply run `sudo ./install.sh`. Follow any instructions whenever prompted for input.

**Alternatively, follow the steps below to install and configure each component on its own:**

#### Install Docker

- Connect to your instance via SSH;
- Follow instructions to Install Docker Engine on Ubuntu.
- The same steps are described in the `src/docker.sh` file.
To install Docker using this file simply run `sudo ./src/docker.sh`. <br>
This will remove any existing Docker versions currently installed on your machine (if any) and install the latest version through the Docker recommended install process. <br>
Once the installation is finished, you can run `docker run hello-world` to confirm that Docker is installed.

#### Install PostgreSQL

- Based on my experience I would recommend using PostgreSQL to store your Metabase data;
- To install this follow instructions on How To Install PostgreSQL on Ubuntu 20.04 [Quick Start].
- The same steps to install PostgreSQL are described in the `src/postgres.sh` file. To install PostgreSQL using this file simply run `sudo ./src/postgres.sh`. This will install the latest version of PostgreSQL.

#### Database setup

> NOTE - Steps below can be achieved by also running the supplied `sudo ./src/db_setup.sh`.

- Now for the tricky part. The main purpose of using a Lightsail/EC2 instance to run Metabase is to have the database as well as the docker container on the same machine. Therefore, we need to make sure that our PostgreSQL database is accessible from the Metabase Docker container. To achieve this we will need to modify a few PostgreSQL files and restart the service.
- The installed version of PostgreSQL will by default not have access to listen on any address other than `localhost`.
- This will need to be changed to allow PostgreSQL to listen on any address by modifying the /etc/postgresql/<version>/main/postgresql.conf by updating the following line:
`#listen_addresses = 'localhost'`
to:
`listen_addresses = '*'`

- In addition to this, you will need to set up PostgreSQL to be accessible from Docker. When running a container, Docker will assign an IP to a container from the range `172.17.0.1/16`. To allow connections to PostgreSQL from this range of addresses, modify the `/etc/postgresql/<version>/main/pg_hba.conf` file by adding the following line if it does not already exist.
`host  all   all   172.17.0.1/16  trust`
- Once done restart your PostgreSQL service by running the `sudo systemctl restart postgresql`

- Setup the PostgreSQL user account and password for Metabase to use for the connection. This will be required in the next step. Below are the commands to create a new user and password in PostgreSQL.
`sudo -u postgres psql -c "CREATE USER <username> WITH PASSWORD '<password>'"`

- This user account will also need to be in the Superuser group so that it has access to creating a new database. Run the command below to add the user into the Superuser group.
`sudo -u postgres psql -c "ALTER USER <username> WITH SUPERUSER"`

- The last step is to create the Metabase database setting the owner of the database to the user-created above. If you already have a database created you can skip this step.
`sudo  -u postgres psql -c “CREATE DATABASE metabase WITH OWNER <username>”`

#### Install Metabase

Once you have Docker and PostgreSQL installed, it's time to get Metabase running.
From the Running Metabase on Docker instructions follow the instructions on Using PostgreSQL as the Metabase application database.
The file `/src/metabase.sh` will help to create the user and password as well as run the Metabase docker container to get this.
Alternatively, you can follow the steps below to set up the PostgreSQL account and run the Metabase Docker container.

- Create the PostgreSQL account.
`sudo -u postgres psql -c "CREATE USER <username> WITH PASSWORD <password>"`

- Set the account as a Superadmin
`sudo -u postgres psql -c "ALTER GROUP Superuser ADD USER <username>"`

- Run the
`sudo docker run -d -p 80:3000 \`

`--add-host host.docker.internal:host-gateway \`
`-e "MB_DB_TYPE=postgres" \`
`-e "MB_DB_DBNAME=metabase" \`
`-e "MB_DB_PORT=5432" \`
`-e "MB_DB_USER=<username>" \`
`-e "MB_DB_PASS=<password>" \`
`-e "MB_DB_HOST=<host_private_ip>" \`
`--name metabase metabase/metabase`

- You can check the progress by checking the logs every couple of seconds with:
`docker logs Metabase`
- Once complete, the logs should show the message below:
![a screenshot of logs](/images/community/percy-musaka-2.png)

**Finally**, using your Lightsail’s public IP Address noted after creating your instance, confirm that Metabase is up and running from your browser http://{IP}/setup. If everything is set up correctly, the page should show a Metabase welcome message as shown below.

*Note from Metabase: Having a database server in the same instance as you have the application is not recommended since resources are being shared for 2 critical components. The recommended deployment model would be to have a database server separate from the server that runs the Metabase application.*
