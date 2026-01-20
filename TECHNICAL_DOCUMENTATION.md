# CrypThreads - Technical Documentation

## Architecture Overview

CrypThreads is a client-side blockchain messaging application built with vanilla JavaScript, HTML5, and CSS3. All data is stored locally using the browser's localStorage API.

## File Structure

```
crypthreads/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── blockchain.js       # Blockchain implementation
├── app.js             # Application logic and UI
├── logo.png           # Application logo
├── README.md          # Project documentation
├── USER_GUIDE.md      # End-user documentation
└── TECHNICAL_DOCUMENTATION.md  # This file
```

---

## Core Components

### 1. Blockchain Implementation (blockchain.js)

#### Block Class

```javascript
class Block {
    constructor(index, timestamp, data, previousHash)
    calculateHash()      // SHA-256 hash calculation
    mineBlock(difficulty) // Proof of Work mining
}
```

**Properties:**
- `index`: Block position in chain
- `timestamp`: Creation time (Unix timestamp)
- `data`: Block payload (messages or genesis data)
- `previousHash`: Hash of previous block
- `hash`: Current block hash
- `nonce`: Proof of Work counter

**Methods:**
- `calculateHash()`: Generates SHA-256 hash from block data
- `mineBlock(difficulty)`: Performs Proof of Work mining

#### Blockchain Class

```javascript
class Blockchain {
    constructor()
    createGenesisBlock()
    getLatestBlock()
    addMessage(from, to, message)
    minePendingMessages()
    getAllMessages()
    getMessagesForUser(username)
    isChainValid()
    encryptMessage(message)
    decryptMessage(encryptedMessage)
    getBlockchainStats()
    toJSON()
    static fromJSON(jsonString)
}
```

**Properties:**
- `chain`: Array of Block objects
- `difficulty`: Mining difficulty (default: 2)
- `pendingMessages`: Queue of unmined messages
- `miningReward`: Reward for mining (currently 0)

**Key Methods:**

**createGenesisBlock()**
- Creates the first block in the chain
- Contains initialization message
- Previous hash set to '0'

**addMessage(from, to, message)**
- Adds message to pending queue
- Encrypts message content
- Assigns unique ID and timestamp
- Returns message object

**minePendingMessages()**
- Creates new block with pending messages
- Performs Proof of Work mining
- Adds block to chain
- Marks messages as mined
- Clears pending queue

**isChainValid()**
- Validates entire blockchain
- Checks hash integrity
- Verifies block linkage
- Returns boolean

**Serialization:**
- `toJSON()`: Converts blockchain to JSON string
- `fromJSON()`: Reconstructs blockchain from JSON

---

### 2. Application Logic (app.js)

#### Global State

```javascript
let blockchain;      // Blockchain instance
let currentUser;     // Currently logged-in user
let users;          // Array of registered users
```

#### Initialization

```javascript
initializeApp()
```
- Loads blockchain from localStorage
- Loads users from localStorage
- Checks for existing session
- Shows appropriate screen

#### Authentication Functions

**register()**
- Validates input fields
- Checks username uniqueness
- Hashes password
- Saves new user
- Redirects to login

**login()**
- Validates credentials
- Verifies password hash
- Creates 30-day session
- Saves session to localStorage
- Shows dashboard

**logout()**
- Confirms logout action
- Clears session from localStorage
- Resets current user
- Shows auth screen

#### Session Management

```javascript
// Session object structure
{
    username: string,
    timestamp: number  // Unix timestamp
}
```

**Session Validation:**
- Checks session age on load
- 30-day expiration (2,592,000,000 ms)
- Auto-logout if expired

#### Dashboard Functions

**updateDashboard()**
- Updates all statistics
- Calculates message counts
- Updates blockchain info
- Refreshes UI elements

**loadMessages()**
- Retrieves user messages
- Filters by current user
- Renders message list
- Shows status indicators

**updateRecipientList()**
- Populates recipient dropdown
- Filters out current user
- Updates on user changes

#### Messaging Functions

**sendMessage()**
- Validates recipient selection
- Validates message content
- Adds to blockchain pending queue
- Updates UI
- Shows notification

**minePendingMessages()**
- Checks for pending messages
- Initiates mining process
- Shows progress notification
- Updates blockchain
- Refreshes dashboard

#### User Management Functions

**showUserList()**
- Opens modal
- Renders user list
- Shows delete buttons
- Highlights current user

**addNewUser()**
- Validates input
- Checks uniqueness
- Creates user object
- Saves to storage
- Updates UI

**deleteUser(username)**
- Confirms deletion
- Removes from array
- Updates storage
- Refreshes UI

#### Utility Functions

**hashPassword(password)**
- Simple hash function
- Converts to base-36
- Returns hash string

**escapeHtml(text)**
- Prevents XSS attacks
- Escapes HTML entities
- Returns safe string

**showNotification(message, type)**
- Displays toast notification
- Types: info, success, error
- Auto-dismisses after 3 seconds

**saveBlockchain()**
- Serializes blockchain
- Saves to localStorage
- Key: 'crypthreads_blockchain'

**saveUsers()**
- Serializes user array
- Saves to localStorage
- Key: 'crypthreads_users'

---

### 3. User Interface (index.html)

#### Screen Structure

**Authentication Screen**
- Login form
- Register form
- Logo display
- Form switching

**Dashboard Screen**
- Left sidebar (statistics)
- Main content (messages)
- Right sidebar (user management)

#### Modals

**User List Modal**
- Shows all users
- Delete functionality
- Close button

**Add User Modal**
- Username input
- Password input
- Submit button

#### Notification Toast
- Fixed position
- Auto-dismiss
- Type-based styling

---

### 4. Styling (styles.css)

#### CSS Variables

```css
:root {
    --primary-cyan: #00FFFF;
    --secondary-cyan: #00CED1;
    --dark-bg: #0a0e1a;
    --darker-bg: #060911;
    --card-bg: #1a1f2e;
    --border-color: #2a3f5f;
    --text-primary: #ffffff;
    --text-secondary: #b0c4de;
    --success: #00ff88;
    --warning: #ffaa00;
    --danger: #ff4444;
}
```

#### Key Features

**Animated Backgrounds**
- Radial gradients
- Grid patterns
- Sliding textures
- Glow effects

**Component Styling**
- Card-based layout
- Border animations
- Hover effects
- Smooth transitions

**Responsive Design**
- Grid layout
- Media queries
- Mobile-friendly
- Flexible components

---

## Data Storage

### localStorage Keys

1. **crypthreads_blockchain**
   - Serialized blockchain
   - Contains all blocks
   - Includes pending messages

2. **crypthreads_users**
   - Array of user objects
   - Hashed passwords
   - Creation timestamps

3. **crypthreads_session**
   - Current session data
   - Username
   - Login timestamp

### Data Structures

#### User Object
```javascript
{
    username: string,
    password: string,  // Hashed
    createdAt: number  // Unix timestamp
}
```

#### Message Object
```javascript
{
    id: number,        // Unique identifier
    from: string,      // Sender username
    to: string,        // Recipient username
    message: string,   // Encrypted content
    timestamp: number, // Unix timestamp
    status: string     // 'pending' or 'mined'
}
```

#### Block Data Structure
```javascript
{
    type: 'genesis' | 'messages',
    message?: string,  // For genesis block
    messages?: Array   // For message blocks
}
```

---

## Security Considerations

### Current Implementation

1. **Password Hashing**
   - Simple hash function
   - Not cryptographically secure
   - Suitable for demonstration

2. **Message Encryption**
   - Base64 encoding
   - Not true encryption
   - Provides basic obfuscation

3. **Session Management**
   - localStorage-based
   - 30-day expiration
   - Client-side only

### Production Recommendations

1. **Use bcrypt for password hashing**
2. **Implement proper encryption (AES-256)**
3. **Add HTTPS requirement**
4. **Implement CSRF protection**
5. **Add rate limiting**
6. **Use secure session tokens**
7. **Implement password recovery**
8. **Add two-factor authentication**

---

## Performance Optimization

### Current Optimizations

1. **Efficient DOM Updates**
   - Batch updates
   - Minimal reflows
   - Event delegation

2. **Data Caching**
   - localStorage persistence
   - In-memory state
   - Auto-save intervals

3. **Mining Simulation**
   - Adjustable difficulty
   - Background processing
   - Progress feedback

### Potential Improvements

1. **Web Workers for mining**
2. **Virtual scrolling for messages**
3. **Lazy loading of blocks**
4. **IndexedDB for large datasets**
5. **Service Worker for offline support**

---

## Browser Compatibility

### Required Features

- localStorage API
- ES6 JavaScript
- CSS Grid
- Flexbox
- CSS Variables
- Async/Await

### Tested Browsers

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

---

## API Reference

### Blockchain API

```javascript
// Create new blockchain
const blockchain = new Blockchain();

// Add message
blockchain.addMessage('alice', 'bob', 'Hello!');

// Mine pending messages
blockchain.minePendingMessages();

// Get all messages
const messages = blockchain.getAllMessages();

// Get user messages
const userMessages = blockchain.getMessagesForUser('alice');

// Validate chain
const isValid = blockchain.isChainValid();

// Get statistics
const stats = blockchain.getBlockchainStats();

// Serialize
const json = blockchain.toJSON();

// Deserialize
const loaded = Blockchain.fromJSON(json);
```

### Application API

```javascript
// Authentication
register();
login();
logout();

// Messaging
sendMessage();
minePendingMessages();

// User Management
showUserList();
addNewUser();
deleteUser(username);

// UI Updates
updateDashboard();
loadMessages();
updateRecipientList();

// Utilities
showNotification(message, type);
saveBlockchain();
saveUsers();
```

---

## Extending the Application

### Adding New Features

1. **Message Attachments**
   - Store files in localStorage
   - Add file input to UI
   - Update message structure

2. **Group Messaging**
   - Add group creation
   - Modify message routing
   - Update UI for groups

3. **Message Search**
   - Add search input
   - Filter messages
   - Highlight results

4. **Export/Import**
   - Add export button
   - Generate JSON file
   - Import from file

5. **Themes**
   - Add theme selector
   - Create color schemes
   - Save preference

### Modifying Blockchain

1. **Change Difficulty**
   ```javascript
   blockchain.difficulty = 3; // Increase difficulty
   ```

2. **Add Block Rewards**
   ```javascript
   blockchain.miningReward = 10;
   ```

3. **Custom Hash Algorithm**
   - Modify `calculateHash()` method
   - Implement different algorithm

4. **Add Timestamps**
   - Include in block data
   - Display in UI

---

## Testing

### Manual Testing Checklist

- [ ] User registration
- [ ] User login
- [ ] Session persistence
- [ ] Send message
- [ ] Mine messages
- [ ] View messages
- [ ] Add user
- [ ] Delete user
- [ ] View user list
- [ ] Logout
- [ ] Blockchain validation
- [ ] Statistics updates
- [ ] Responsive design
- [ ] Browser compatibility

### Automated Testing (Future)

```javascript
// Example test structure
describe('Blockchain', () => {
    it('should create genesis block', () => {
        const blockchain = new Blockchain();
        expect(blockchain.chain.length).toBe(1);
    });
    
    it('should add message to pending', () => {
        const blockchain = new Blockchain();
        blockchain.addMessage('alice', 'bob', 'test');
        expect(blockchain.pendingMessages.length).toBe(1);
    });
});
```

---

## Deployment

### Current Deployment

- **Platform**: AWS S3 + CloudFront
- **URL**: https://sites.super.myninja.ai/fdd0953b-d9e8-4878-b8b4-4f4620ecb5dc/83d6abda/index.html
- **Type**: Static site
- **CDN**: CloudFront distribution

### Alternative Deployment Options

1. **GitHub Pages**
   - Free hosting
   - Custom domain support
   - Automatic deployment

2. **Netlify**
   - Continuous deployment
   - Custom domains
   - HTTPS included

3. **Vercel**
   - Fast deployment
   - Preview URLs
   - Analytics

4. **Firebase Hosting**
   - Google infrastructure
   - SSL certificates
   - Custom domains

---

## Troubleshooting

### Common Issues

**localStorage Full**
- Clear old data
- Implement data cleanup
- Use IndexedDB instead

**Mining Too Slow**
- Reduce difficulty
- Optimize hash function
- Use Web Workers

**Session Not Persisting**
- Check localStorage access
- Verify session timestamp
- Clear corrupted data

**Messages Not Appearing**
- Verify mining completed
- Check message filters
- Refresh blockchain state

---

## Future Enhancements

### Planned Features

1. **Real-time Updates**
   - WebSocket integration
   - Live message delivery
   - Online status indicators

2. **Advanced Encryption**
   - End-to-end encryption
   - Public/private keys
   - Digital signatures

3. **Message History**
   - Pagination
   - Search functionality
   - Export conversations

4. **User Profiles**
   - Profile pictures
   - Bio information
   - Status messages

5. **Notifications**
   - Browser notifications
   - Sound alerts
   - Badge counts

### Technical Improvements

1. **Backend Integration**
   - Node.js server
   - Database storage
   - API endpoints

2. **Mobile App**
   - React Native
   - Push notifications
   - Native features

3. **Testing Suite**
   - Unit tests
   - Integration tests
   - E2E tests

4. **CI/CD Pipeline**
   - Automated testing
   - Deployment automation
   - Version control

---

## Contributing

### Code Style

- Use ES6+ features
- Follow consistent naming
- Add comments for complex logic
- Keep functions small and focused

### Git Workflow

1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

---

## License

This project is for demonstration purposes.

---

## Contact

For technical questions or contributions, please refer to the project repository.

---

**Built with ❤️ using Blockchain Technology**