# Tiktokens

## Problem
<div align="center">
  <img src="/assets/unbanked.png" alt="unbanked">
</div>
<br>
### There are many unbanked indviduals in the world
Overall, the World Bank estimates about one-quarter of the world’s adults don’t have access to a bank or mobile-phone account. But that varies dramatically by region. In countries that use the Euro, almost everyone has a bank account, while in the Middle East and North Africa, only about half the population does.

### How to go beyond traditional payment methods and cover more users
Many people are not well-served by current payment solutions that rely heavily on credit and debit cards. This leaves a significant portion of the population without easy access to digital payments. Our goal is to bridge this gap by bringing secure, trustworthy, and user-friendly payment solutions to everyone, especially those who are underbanked.

## Objectives
- **Innovative Payment Solution**: Develop a payment system that operates without the need for credit or debit cards.
- **Security and Trust**: Ensure robust security measures and maintain a high level of trust and safety for users' funds.

## Our Solution
<div align="center">
  <a href="https://tiktok-techjam-vercel.vercel.app">
  <img src="/assets/home_screen.png" alt="Tiktokens Home Screen">    
  </a>
</div>
<br>
Introducing our innovative payment system integrated with TikTok Shop, which leverages neighborhood stores for cash deposits and withdrawals. Additionally, the app facilitates the instant creation of virtual cards for online payments.

## Code Structure
- `/backend`: Backend code (Flask)
- `/frontend`: Frontend code (Next.js)
- `/assets`: Images used in this markdown

To deploy our code locally, you may navigate to `/frontend` and run `npm run dev`

## Architecture
<div align="center">
  <img src="/assets/archictecture.png" alt="Archictecture Diagram">
</div>
<br>
This architecture demonstrates our system's infrastructure, which includes secure authentication, load balancing, auto-scaling, and seamless integration with payment service providers.

## Features

### 1. Withdrawal
Users can request the amount they need on our app, show the receipt to a participating shop owner for verification, and receive their cash. The transaction is processed securely in the background.

### 2. Deposit
To deposit cash, users hand over the money to the shop owner, who then scans the user’s QR code to top up the user’s account. The money is transferred securely into the user’s account in real-time.

### 3. Additional Features
- **Google Maps Integration**: Our app includes a map feature using the Google Maps API, allowing users to find the nearest participating shops and their withdrawal limits.
- **Customizable Withdrawal Limits**: Withdrawal limits are flexible and customizable for each participating shop, ensuring that shop owners can set maximum withdrawal amounts per person.
- **NFC and QR Payments**: We support NFC and QR payments between users, making peer-to-peer transactions effortless.
- **Instant Virtual Card Creation**: The app allows for the instant creation of a virtual card to be used for online payments.

## Video
[Watch our introduction video](https://youtu.be/eUPsZd9VtHY)

