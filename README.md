# Slot Booking Backend  ( version 1 - Node.js + MySQL)

## Project Overview

This project implements a **slot booking system** using **Node.js, Express, and MySQL**.
The goal of the system is to **prevent double booking and handle concurrent users safely**.

The system ensures:

* No overbooking of slots
* Consistent database updates
* Safe handling of multiple users booking simultaneously

# Features

* View available slots
* Book a slot
* Cancel a booking
* Reschedule a booking
* Prevent double booking
* Prevent same user booking the same slot twice
* Prevent booking past slots
* Handle concurrent booking safely
* Transaction rollback on failure

---

# Tech Stack

Backend

* Node.js
* Express.js

Database

* MySQL

Libraries

* mysql2
* dotenv
* morgan
* winston

# Database Schema

## Users

| Field | Type     |
| ----- | -------- |
| id    | INT (PK) |
| name  | VARCHAR  |
| email | VARCHAR  |

---

## Slots

| Field      | Type     |
| ---------- | -------- |
| id         | INT (PK) |
| slot_date  | DATE     |
| start_time | TIME     |
| end_time   | TIME     |
| capacity   | INT      |
| available  | INT      |

---

## Bookings

| Field      | Type      |
| ---------- | --------- |
| id         | INT (PK)  |
| user_id    | INT (FK)  |
| slot_id    | INT (FK)  |
| status     | ENUM      |
| created_at | TIMESTAMP |

---

# API Endpoints

## Get Available Slots

GET

```
/api/slots
```


## Book Slot

POST

```
/api/book
```


## Cancel Booking

POST

```
/api/cancel
```


## Reschedule Booking

POST

```
/api/reschedule
```

