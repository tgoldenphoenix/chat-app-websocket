package fpt.aptech.wsserver.user;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
//@FieldDefaults(level = AccessLevel.PACKAGE)
// table name khong dung user it is reserved word in SQL
@Table(name = "chatuser")
public class User {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nick_name", nullable = false)
    private String nickName; // nickname là id

    private String fullName;

    @Enumerated(EnumType.STRING)
    private Status status; // online / offline

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

    //    // Getter
//    public String getNickName() {
//        return nickName;
//    }
//
//    // Setter
//    public void setStatus(Status newName) {
//        this.status = newName;
//    }

    @Override
    public String toString(){
        return "nick name: "+nickName+", full name: "+fullName+", status: "+status;
    }
}
