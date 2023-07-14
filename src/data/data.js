const emails = [
    {
        id: 1,
        subject: "Hello",
        sender: "john@example.com",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 2,
        subject: "Meeting Reminder",
        sender: "jane@example.com",
        body: "Just a reminder about the meeting tomorrow at 10 AM.",
    },
    {
        id: 3,
        subject: "Important Announcement",
        sender: "admin@example.com",
        body: "Please be informed that the system maintenance will take place this weekend.",
    },
];

const sentEmails = [
    {
        id: 1,
        subject: "Re: Hello",
        recipient: "john@example.com",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Thanks for reaching out!",
    },
    {
        id: 2,
        subject: "Re: Meeting Reminder",
        recipient: "jane@example.com",
        body: "Yes, I'll be there. Looking forward to the meeting!",
    },
];

export { emails, sentEmails };