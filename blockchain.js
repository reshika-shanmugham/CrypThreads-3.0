// Blockchain Implementation for CrypThreads

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        const crypto = {
            sha256: (str) => {
                // Simple SHA-256 implementation for browser
                let hash = 0;
                for (let i = 0; i < str.length; i++) {
                    const char = str.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char;
                    hash = hash & hash;
                }
                return Math.abs(hash).toString(16).padStart(64, '0');
            }
        };
        
        return crypto.sha256(
            this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.nonce
        );
    }

    mineBlock(difficulty) {
        const target = Array(difficulty + 1).join('0');
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Block mined: ' + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingMessages = [];
        this.miningReward = 0;
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), {
            type: 'genesis',
            message: 'Genesis Block - CrypThreads Initialized'
        }, '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addMessage(from, to, message) {
        const messageData = {
            id: Date.now() + Math.random(),
            from: from,
            to: to,
            message: this.encryptMessage(message),
            timestamp: Date.now(),
            status: 'pending'
        };
        
        this.pendingMessages.push(messageData);
        return messageData;
    }

    minePendingMessages() {
        if (this.pendingMessages.length === 0) {
            return false;
        }

        const block = new Block(
            this.chain.length,
            Date.now(),
            {
                type: 'messages',
                messages: [...this.pendingMessages]
            },
            this.getLatestBlock().hash
        );

        block.mineBlock(this.difficulty);
        this.chain.push(block);

        // Mark messages as mined
        this.pendingMessages.forEach(msg => {
            msg.status = 'mined';
        });

        this.pendingMessages = [];
        return true;
    }

    getAllMessages() {
        const messages = [];
        
        // Get mined messages from blockchain
        for (let i = 1; i < this.chain.length; i++) {
            const block = this.chain[i];
            if (block.data.type === 'messages' && block.data.messages) {
                block.data.messages.forEach(msg => {
                    messages.push({
                        ...msg,
                        message: this.decryptMessage(msg.message),
                        status: 'mined'
                    });
                });
            }
        }
        
        // Add pending messages
        this.pendingMessages.forEach(msg => {
            messages.push({
                ...msg,
                message: this.decryptMessage(msg.message),
                status: 'pending'
            });
        });
        
        return messages.sort((a, b) => b.timestamp - a.timestamp);
    }

    getMessagesForUser(username) {
        const allMessages = this.getAllMessages();
        return allMessages.filter(msg => 
            msg.from === username || msg.to === username
        );
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    encryptMessage(message) {
        // Simple encryption (in production, use proper encryption)
        return btoa(message);
    }

    decryptMessage(encryptedMessage) {
        try {
            return atob(encryptedMessage);
        } catch (e) {
            return encryptedMessage;
        }
    }

    getBlockchainStats() {
        return {
            totalBlocks: this.chain.length,
            pendingMessages: this.pendingMessages.length,
            isValid: this.isChainValid(),
            difficulty: this.difficulty
        };
    }

    // Serialize blockchain to JSON
    toJSON() {
        return JSON.stringify({
            chain: this.chain,
            pendingMessages: this.pendingMessages,
            difficulty: this.difficulty
        });
    }

    // Load blockchain from JSON
    static fromJSON(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            const blockchain = new Blockchain();
            
            // Reconstruct chain
            blockchain.chain = data.chain.map(blockData => {
                const block = new Block(
                    blockData.index,
                    blockData.timestamp,
                    blockData.data,
                    blockData.previousHash
                );
                block.hash = blockData.hash;
                block.nonce = blockData.nonce;
                return block;
            });
            
            blockchain.pendingMessages = data.pendingMessages || [];
            blockchain.difficulty = data.difficulty || 2;
            
            return blockchain;
        } catch (e) {
            console.error('Error loading blockchain:', e);
            return new Blockchain();
        }
    }
}

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Blockchain, Block };
}