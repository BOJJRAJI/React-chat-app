import {Component} from 'react'

import EmojiPicker from 'emoji-picker-react'

import {uuid4 as v4} from 'uuid4'

import './App.css'

const userList = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin']

const DisplayMessages = props => {
  const {message, handleLike} = props
  const {id, user, text, likes} = message

  const hitLike = () => {
    handleLike(id)
  }

  return (
    <div className="message-container">
      <p className="user-name">{user}</p>
      <div className="text-like-container">
        <span className="message">{text}</span>
        <button className="like-button" onClick={hitLike} type="button">
          {likes > 1 ? `Likes ${likes}` : `Like ${likes}`}
        </button>
      </div>
    </div>
  )
}

class App extends Component {
  state = {messagesList: [], message: '', showPicker: false}

  getInput = event => {
    this.setState({message: event.target.value})
  }

  addMessage = () => {
    const {message, messagesList} = this.state

    if (message.trim() === '') return

    const randomUser = userList[Math.floor(Math.random() * userList.length)]
    const newMessage = {
      id: v4(),
      user: randomUser,
      text: message,
      likes: 0,
    }

    this.setState({messagesList: [...messagesList, newMessage]})
  }

  handleLike = id => {
    this.setState(prevState => ({
      messagesList: prevState.messagesList.map(msg => {
        if (msg.id === id) {
          const updatedQuantity = msg.likes + 1
          return {...msg, likes: updatedQuantity}
        }
        return msg
      }),
    }))
  }

  changePickerState = () => {
    this.setState(prevState => ({showPicker: !prevState.showPicker}))
  }

  onEmojiClick = event => {
    this.setState(prevState => ({
      message: prevState.message + event.emoji,
    }))
    this.setState({showPicker: false})
  }

  render() {
    const {message, messagesList, showPicker} = this.state

    return (
      <div className="chat-bg-container">
        <div className="details-chat-container">
          <div className="charts-container">
            <ul className="unorderd-charts-container">
              {messagesList.map(messageDetails => (
                <DisplayMessages
                  message={messageDetails}
                  key={messageDetails.id}
                  handleLike={this.handleLike}
                />
              ))}
            </ul>
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={this.getInput}
              className="input-box"
            />
            <img
              className="emoji-icon"
              src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
              onClick={this.changePickerState}
              alt="emoji"
            />

            {showPicker && (
              <EmojiPicker
                pickerStyle={{width: '100%'}}
                onEmojiClick={this.onEmojiClick}
              />
            )}

            <button
              onClick={this.addMessage}
              type="button"
              className="send-button"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
