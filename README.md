# u-proof ✉️

A message proofing system built for church staff across multiple locations. `u-proof` ensures clear and reviewed communication by enabling staff to send messages for proofreading before sharing them with volunteers or other team members.

## ✨ Features

- Compose messages with subject and department selection
- Route messages to appropriate church locations for review
- Staff at each location can proofread and approve or request edits
- Email notifications powered by Resend
- Designed for internal communication within church networks

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Email Service:** [Resend](https://resend.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB connection URI
- Resend API key

### Installation

```bash
git clone https://github.com/dujules23/u-proof.git
cd u-proof
npm install
```

### Environment Variables

Create a `.env.local` file with the following:

```env
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
```

### Run Locally

```bash
npm run dev
```

Then visit `http://localhost:3000` in your browser.

## 🧪 Usage

1. Staff member logs in.
2. Composes a message with subject and department.
3. Selects their church location.
4. Submits for review.
5. Staff at the location receive an email with the message to proofread.
6. They approve or request edits via email or interface.

## 🤝 Contributing

This project is currently not open to external contributions.

## 📄 License

_This project currently has **no license**, meaning all rights are reserved._

## 🙏 Acknowledgments

Built with ❤️ to help ensure effective and thoughtful communication in ministry.