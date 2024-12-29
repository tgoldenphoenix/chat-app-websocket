package fpt.aptech.wsserver.user;

import fpt.aptech.wsserver.chatroom.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
//    @Query("SELECT s FROM User s WHERE s.status = :status")
//    List<User> findByStatus(Status status);

    @Query(nativeQuery = true, value = "SELECT * FROM chatuser WHERE status = :#{#stage?.name()}")
    List<User> findByStatus(@Param("stage") Status stage);
}
