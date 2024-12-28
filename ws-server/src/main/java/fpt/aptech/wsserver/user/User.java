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
    @Column(name = "nickname", nullable = false)
    private String nickName; // nickname là id

    private String fullName;
    private Status status;

    // Getter
    public String getNickName() {
        return nickName;
    }

    // Setter
    public void setStatus(Status newName) {
        this.status = newName;
    }

    @Override
    public String toString(){
        return "nick name: "+nickName+", full name: "+fullName+", status: "+status;
    }
}
