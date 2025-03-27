---
layout: learn_article
date: 2022-01-05
categories: Databases
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/databases/normalization
---

_Data normalization_ is the process of structuring information in a database to cut down on redundancy and make that database more efficient. Think of normalization as a way to make sure that every field and table in your database is organized logically, so that you can avoid [data anomalies](#data-anomalies) when inserting, updating, or deleting records. This process is carried out according to specific [rules](#rules-of-normalization) that dictate how tables should be organized.

Normalization is one part of the larger data cleaning and standardization process, which also involves confirming that your data is accurate, complete, and doesn't contain duplicate records, as well as ensuring that you've selected the appropriate [data types](data-types-overview) for your fields. If you're starting with denormalized tables, the normalization process will involve creating additional, smaller tables that can be joined to one another by a [foreign key](/glossary/foreign_key). Maybe you've become frustrated with having to update the same information in multiple places across your database after a single value changes, or are finding that you're losing valuable data when a record gets deleted. Normalizing your tables will help in both of these cases.

The principles we'll cover in this lesson apply to relational database management systems (RDBMS). If you're using a NoSQL or [document-based database](/learn/grow-your-data-skills/data-fundamentals/types-of-databases) like MongoDB, the information below won't apply.

## Simplification and reducing storage: benefits of normalized data

Normalization is all about making your data more efficient, so that your team can find and use the information they need. These benefits and rules may seem like common sense once you have some familiarity with how databases work, but it pays to know the explicit purpose of each table and field within your database. Benefits of normalized data include:

- **Simplifying transactional queries**. With normalized data, a query for customer addresses only needs to look in the single field that stores those addresses. If you store customer addresses multiple times in different locations across your database or even keep multiple addresses within the same field, that query will take longer to execute.

- **Decreasing the size of your database**. If you repeat customer data in several locations across your database, that means you've made space to store that information several times. This may not be a major concern if your database only contains a few tables, but if you're working on a larger scale, disk space can be at a premium. Reducing duplicate information means cutting storage costs, whether you're running a local server or relying on a cloud-hosted database.

- **Make database maintenance easier**. Think of that same customer data stored several times in your database. Each time a customer changes their address, it will need updated in every instance of a `Customer Address` field, which leaves a lot of room for error. If your data is normalized, you'll only have one `Customer Address` field, which joins to other relevant tables like `Orders`.

## Data anomalies

Data anomalies are inconsistencies in how information is stored within a database. These flaws with how a database is structured become apparent whenever something goes wrong when a record is updated, added, or deleted. Fortunately, adhering to the rules of normalization can prevent these anomalies from happening in the first place.

### Update anomaly

**Update anomalies** stem from data redundancy. For example, let's say your database stores customer address information in fields across several tables. A customer changing their address may result in only one of those fields updating to include the new information, leaving you with inconsistent data.

### Insertion anomaly

An **insertion anomaly** occurs when a record can't be created without certain fields containing data — data that may not exist yet. For example, a denormalized database may be structured so that a customer account can't be created unless that customer has place an order. Normalizing that database would solve this problem, through the creation of separate `Orders` and `Customers` tables, with no rule prohibiting null values.

### Deletion anomaly

Unintentional information loss is the result of a **deletion anomaly**. Let's say a table in your database includes information about university courses and the students that take those courses. If one course was cancelled due to low enrollment, you may inadvertently lose valuable student information by removing that course record. Like with insertion anomalies, breaking your data out into multiple, specific tables would prevent this issue.

## Rules of normalization

The rules for normalizing data were first introduced in the early 1970s. These rules are grouped in tiers called _normal forms_. Each tier builds upon the last — you can only apply the second tier of rules if your data already meets the first tier of rules, and so on. While there are several more normal forms beyond the three listed below, these first three are sufficient for most use cases.

As we covered in our [introduction to databases](database-basics), tables within a database should contain a [entity key](/glossary/entity_key), also known as a primary key. This field distinguishes each row within a table according to a unique ID, and is helpful when joining tables. Before we can even get into first normal form, your table needs to have an entity key field.

### First normal form (1NF)

The **first normal form** (1NF) dictates that each field within a table should only store one value, and that your table shouldn't contain multiple fields that store similar information, like columns titled **Address1** and **Address2**.

Here's an example of a table that we'll normalize according to first normal form. This table includes information about college courses and who teaches them.

#### Professor table

| Professor ID | Professor name | Course name                 |
| ------------ | -------------- | --------------------------- |
| P001         | Gene Watson    | Intro to Philosophy; Ethics |
| P002         | Melissa King   | Quantum Mechanics           |
| P003         | Errol Tyson    | Macroeconomics              |
| P004         | Mary Jacobson  | Graphic Novels              |

We notice that while our fields are distinct, one professor (Gene Watson, in the first row) is teaching two courses, and that information is currently stored within a single cell. If we normalize this table according to 1NF, we'll need to break our data out into multiple tables:

#### Normalized professor table

| Professor ID | Professor name |
| ------------ | -------------- |
| P001         | Gene Watson    |
| P002         | Melissa King   |
| P003         | Errol Tyson    |
| P004         | Mary Jacobson  |

#### Normalized course table

| Course ID | Course name         | Professor ID |
| --------- | ------------------- | ------------ |
| C001      | Intro to Philosophy | P001         |
| C002      | Ethics              | P001         |
| C003      | Quantum Mechanics   | P002         |
| C004      | Macroeconomics      | P003         |
| C005      | Graphic Novels      | P004         |

Since one professor can teach more than one course, we've broken this data out into two tables. Now, our `Professor` table has a _one-to-many_ relationship with our `Course` table. This new table structure meets first normal form, and joins the two tables via a foreign key, the `Professor ID` field.

### Second normal form (2NF)

**Second normal form** is about reducing redundancy and making sure that every field describes something about what the [entity key](/glossary/entity_key) identifies. To meet 2NF, all fields in a table that aren't the entity key must be fully dependent on the table's entity key (which may be a composite key made up of two fields). Let's look at a new example — a table that includes information about your employees' birthdays.

#### Employee birthday table

| Employee ID | Birthday    | Department |
| ----------- | ----------- | ---------- |
| E001        | November 18 | Accounting |
| E002        | March 29    | Sales      |
| E003        | June 1      | Marketing  |
| E004        | February 7  | Accounting |

This table meets 1NF, because each column is distinct and only holds one value within each cell. However, this table has a composite key: `Employee ID` + `Birthday` combined make up the table's entity key. This table does not meet 2NF in its current state, because the `Department` field only _partially_ depends on the composite key, since an employee's department doesn't depend on their birthday, only on their employee ID. To fix this, we'll break this information out into two tables:

#### Normalized employee birthday table

| Employee ID | Birthday    |
| ----------- | ----------- |
| E001        | November 18 |
| E002        | March 29    |
| E003        | June 1      |
| E004        | February 7  |

#### Normalized employee department table

| Employee ID | Department |
| ----------- | ---------- |
| E001        | Accounting |
| E002        | Sales      |
| E003        | Marketing  |
| E004        | Accounting |

### Third normal form (3NF)

A table meets **third normal form** if (in addition to meeting 2NF) it doesn't contain any transitive dependency. Transitive dependency happens when Column A depends on Column B, and Column B depends on the entity key. If you want to normalize according to 3NF, you'll need to remove Column A from the table, since it does not depend on the entity key directly, and place it in a different table with its own entity key.

#### Orders table

| Order ID | Order date | Customer ID | Customer zip code |
| -------- | ---------- | ----------- | ----------------- |
| R001     | 01/17/2021 | C032        | 99702             |
| R002     | 03/01/2021 | C004        | 39204             |
| R003     | 06/30/2021 | C054        | 06505             |
| R004     | 08/22/2021 | C010        | 84098             |
| R005     | 09/27/2021 | C004        | 39204             |

This table isn't in third normal form because the `Customer zip code` field is dependent on `Customer ID`, which is not this table's entity key (the entity key here is `Order ID`). Our current structure could lead to unwanted information loss; if customer C032 returned their order and we needed to delete this record, we'd unintentionally lose their zip code information. If customer C004 ever moved and their zip code changed, we'd also have to update it in two places, since they've placed multiple orders. To bring this table into 3NF — you guessed it — we're going to break it out into two tables.

#### Normalized orders table

| Order ID | Order date | Customer ID |
| -------- | ---------- | ----------- |
| R001     | 01/17/2021 | C032        |
| R002     | 03/01/2021 | C004        |
| R003     | 06/30/2021 | C054        |
| R004     | 08/22/2021 | C010        |
| R005     | 09/27/2021 | C004        |

#### Normalized customers table

| Customer ID | Customer zip code |
| ----------- | ----------------- |
| C032        | 99702             |
| C004        | 39204             |
| C054        | 06505             |
| C010        | 84098             |

## Drawbacks to normalization: when to denormalize

Once you reach higher levels of normalization, your database may perform certain analytical queries at a slower rate — particularly those that need to grab a lot of data. Since normalized data demands that a database tap into several tables to perform a query, this can take longer, especially as your database grows in complexity. The tradeoff is that your normalized data takes up less space.
