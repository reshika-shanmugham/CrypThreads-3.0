# CrypThreads User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Registration](#registration)
3. [Login](#login)
4. [Dashboard Overview](#dashboard-overview)
5. [Sending Messages](#sending-messages)
6. [Mining Messages](#mining-messages)
7. [User Management](#user-management)
8. [Understanding the Blockchain](#understanding-the-blockchain)
9. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Accessing CrypThreads
Visit the permanent URL: **https://sites.super.myninja.ai/fdd0953b-d9e8-4878-b8b4-4f4620ecb5dc/83d6abda/index.html**

The application will load with the login screen displaying the CrypThreads logo and authentication options.

---

## Registration

### Creating Your Account

1. **Click "Register"** link on the login page
2. **Enter Username**: 
   - Minimum 3 characters
   - Must be unique
   - Case-sensitive
3. **Enter Password**: 
   - Minimum 6 characters
   - Will be securely hashed
4. **Confirm Password**: 
   - Must match your password exactly
5. **Click "Register"** button

**Success**: You'll see a notification and be redirected to the login page.

### Registration Tips
- Choose a memorable username
- Use a strong password
- Remember your credentials (no password recovery available)

---

## Login

### Accessing Your Account

1. **Enter Username**: Your registered username
2. **Enter Password**: Your account password
3. **Click "Login"** button

**Success**: You'll be redirected to the dashboard.

### Session Persistence
- Your session remains active for **30 days**
- You won't need to login again during this period
- Works across different devices and browsers
- Session automatically expires after 30 days

### Quick Login
- Press **Enter** after typing your password to login quickly

---

## Dashboard Overview

### Left Sidebar - Statistics

**Total Blocks**
- Shows the number of blocks in the blockchain
- Starts at 1 (Genesis Block)
- Increases with each mining operation

**Pending Messages**
- Number of messages waiting to be mined
- Updates in real-time
- Decreases to 0 after mining

**Total Messages**
- Count of messages you've received
- Only includes mined (delivered) messages
- Updates after mining

**Total Users**
- Number of registered users in the system
- Updates when users are added or deleted

**Blockchain Status**
- Always shows "Valid & Verified"
- Green indicator confirms blockchain integrity

### Main Content - Messaging Area

**Message List**
- Displays all your messages (sent and received)
- Shows message status (Pending/Mined)
- Includes timestamps
- Scrollable for long conversations

**Message Input**
- Recipient selector dropdown
- Text area for message content
- Send button to submit

### Right Sidebar - User Management

**Mine Pending Messages Button**
- Primary action button
- Processes all pending messages
- Creates new blockchain blocks

**User Actions**
- View All Users
- Add New User
- Logout

**Mining Information**
- Current difficulty level
- Last mining timestamp

---

## Sending Messages

### Step-by-Step Process

1. **Select Recipient**
   - Click the "Send to:" dropdown
   - Choose a user from the list
   - Only shows other users (not yourself)

2. **Type Your Message**
   - Click in the message text area
   - Type your message (max 1000 characters)
   - Message will be encrypted automatically

3. **Send Message**
   - Click "Send Message" button
   - Or press **Ctrl+Enter** for quick send
   - Message is added to pending queue

4. **Confirmation**
   - You'll see a notification
   - Message appears in the list with "Pending" status
   - Statistics update automatically

### Message Status

**⏳ Pending Mining**
- Message is in the queue
- Not yet delivered to recipient
- Waiting for mining operation

**✓ Mined & Delivered**
- Message has been mined
- Added to blockchain
- Delivered to recipient

---

## Mining Messages

### What is Mining?

Mining is the process of:
- Validating pending messages
- Creating a new block in the blockchain
- Delivering messages to recipients
- Ensuring message authenticity

### How to Mine

1. **Check Pending Messages**
   - Look at the "Pending Messages" counter
   - Must be greater than 0 to mine

2. **Click "Mine Pending Messages"**
   - Located in the right sidebar
   - Bright cyan button with pickaxe icon

3. **Wait for Mining**
   - Process takes a few seconds
   - "Mining in progress" notification appears
   - Proof of work algorithm runs

4. **Mining Complete**
   - Success notification appears
   - New block added to blockchain
   - Messages marked as "Mined & Delivered"
   - Statistics update automatically

### Mining Tips
- Mine regularly to deliver messages
- Multiple messages can be mined together
- Mining creates permanent blockchain records
- Cannot undo mining operations

---

## User Management

### Viewing All Users

1. **Click "View All Users"** button
2. **User List Modal Opens**
   - Shows all registered users
   - Displays your username with "(You)" label
   - Each user has a delete button (except you)

3. **Close Modal**
   - Click the X button
   - Click outside the modal

### Adding New Users

1. **Click "Add New User"** button
2. **Fill in Details**
   - Username (minimum 3 characters)
   - Password (minimum 6 characters)
3. **Click "Add User"**
4. **Success**
   - User is registered
   - Available in recipient list
   - Statistics update

### Deleting Users

1. **Open "View All Users"**
2. **Find User to Delete**
3. **Click "Delete"** button
4. **Confirm Deletion**
5. **User Removed**
   - Deleted from system
   - Removed from recipient list
   - Statistics update

**Note**: You cannot delete your own account while logged in.

### Logout

1. **Click "Logout"** button
2. **Confirm Logout**
3. **Session Cleared**
   - Redirected to login page
   - Must login again to access dashboard

---

## Understanding the Blockchain

### What is a Blockchain?

A blockchain is a chain of blocks, where each block contains:
- **Index**: Block number in the chain
- **Timestamp**: When the block was created
- **Data**: Messages in this block
- **Previous Hash**: Link to previous block
- **Hash**: Unique identifier for this block
- **Nonce**: Proof of work value

### How CrypThreads Uses Blockchain

1. **Genesis Block**
   - First block created automatically
   - Contains initialization message
   - Forms the foundation of the chain

2. **Message Blocks**
   - Created during mining
   - Contains encrypted messages
   - Linked to previous block

3. **Chain Validation**
   - Continuously verified
   - Ensures no tampering
   - Maintains data integrity

### Blockchain Benefits

- **Immutability**: Messages cannot be altered
- **Security**: Cryptographic protection
- **Transparency**: All blocks are linked
- **Verification**: Always validated
- **Decentralized**: No central authority

---

## Troubleshooting

### Cannot Login

**Problem**: Invalid username or password
- **Solution**: Check spelling and capitalization
- **Solution**: Ensure you registered the account
- **Solution**: Try registering if you're a new user

### Session Expired

**Problem**: Logged out automatically
- **Solution**: Session expired after 30 days
- **Solution**: Login again with your credentials

### Cannot Send Message

**Problem**: No recipient selected
- **Solution**: Choose a recipient from dropdown
- **Solution**: Add users if list is empty

**Problem**: Empty message
- **Solution**: Type a message before sending

**Problem**: Message too long
- **Solution**: Keep messages under 1000 characters

### Mining Not Working

**Problem**: No pending messages
- **Solution**: Send messages first
- **Solution**: Check "Pending Messages" counter

**Problem**: Mining takes too long
- **Solution**: Wait a few seconds
- **Solution**: Refresh page if stuck

### Messages Not Appearing

**Problem**: Messages still pending
- **Solution**: Mine pending messages
- **Solution**: Messages only deliver after mining

### User Management Issues

**Problem**: Cannot add user
- **Solution**: Check username is unique
- **Solution**: Ensure password meets requirements

**Problem**: Cannot delete user
- **Solution**: Cannot delete yourself
- **Solution**: Logout and login as different user

### Data Loss

**Problem**: Lost all data
- **Solution**: Data stored in browser localStorage
- **Solution**: Clearing browser data deletes everything
- **Solution**: Use same browser to maintain data

### Browser Compatibility

**Problem**: Application not working
- **Solution**: Use modern browser (Chrome, Firefox, Safari, Edge)
- **Solution**: Enable JavaScript
- **Solution**: Clear browser cache

---

## Best Practices

### Security
- Use strong passwords
- Don't share credentials
- Logout on shared devices
- Keep browser updated

### Messaging
- Mine messages regularly
- Keep messages concise
- Check recipient before sending
- Review pending queue

### User Management
- Add users as needed
- Remove inactive users
- Maintain organized user list
- Use descriptive usernames

### Performance
- Mine messages in batches
- Clear old messages periodically
- Don't exceed storage limits
- Refresh page if slow

---

## Keyboard Shortcuts

- **Enter**: Submit login/register forms
- **Ctrl+Enter**: Send message quickly
- **Esc**: Close modals (future feature)

---

## Support

For issues or questions:
1. Review this user guide
2. Check the troubleshooting section
3. Verify browser compatibility
4. Clear cache and try again

---

**Enjoy secure messaging with CrypThreads!** 🔐✨