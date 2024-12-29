package fpt.aptech.wsserver.chatroom;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {

    // có thể dùng between
    @Query("SELECT s FROM ChatRoom s WHERE s.senderId = :sender AND s.recipientId = :receiver")
    public Optional<ChatRoom> findBySenderIdAndRecipientId(String sender, String receiver);

}
