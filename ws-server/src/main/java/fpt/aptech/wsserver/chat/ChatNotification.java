package fpt.aptech.wsserver.chat;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "chatroom")
@Getter
@Setter
@Builder
//@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatNotification {
    @Id
    private int id;

    private String senderId;
    private String recipientId;
    private String content;

    public ChatNotification(int id, String senderId, String recipientId, String content) {
        this.id = id;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.content = content;
    }
}
