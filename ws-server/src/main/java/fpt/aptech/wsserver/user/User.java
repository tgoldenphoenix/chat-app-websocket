package fpt.aptech.wsserver.user;

import fpt.aptech.wsserver.chatroom.ChatRoom;
import jakarta.persistence.*;
//import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

//@Entity
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//@FieldDefaults(level = AccessLevel.PACKAGE)
// table name khong dung user it is reserved word in SQL
//@Table(name = "chatuser")
@Document
public class User {
    @Id
    private String nickName; // nickname là id
    private String fullName;
    private Status status;

//    @OneToMany(mappedBy = "sender_id",fetch = FetchType.LAZY)
//    private List<ChatRoom> chatRooms = new ArrayList<>();
//
//    @OneToMany(mappedBy = "recipient_id",fetch = FetchType.LAZY)
//    private List<ChatRoom> chatRoomss = new ArrayList<>();

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @Override
    public String toString(){
        return "nick name: "+nickName+", full name: "+fullName+", status: "+status;
    }
}
