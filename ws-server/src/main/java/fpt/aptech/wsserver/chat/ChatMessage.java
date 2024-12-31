package fpt.aptech.wsserver.chat;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "chatmessage")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", unique = true)
    private int id;

    private String chatId;
    private String senderId;
    private String recipientId;
    private String content;
    private Date timestamp;
    private Status status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(String recipientId) {
        this.recipientId = recipientId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    //Getter
//    public String getReceiverName() {
//        return receiverName;
//    }
}
