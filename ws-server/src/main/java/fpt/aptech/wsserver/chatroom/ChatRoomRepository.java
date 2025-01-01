package fpt.aptech.wsserver.chatroom;

import fpt.aptech.wsserver.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {

    Optional<ChatRoom> findBySenderIdAndRecipientId(String senderId, String recipientId);

    // có thể dùng between
//    @Query("SELECT s FROM ChatRoom s WHERE s.senderId = :sender AND s.recipientId = :receiver")
//    public Optional<ChatRoom> findBySenderIdAndRecipientId(User sender, User receiver);

}
