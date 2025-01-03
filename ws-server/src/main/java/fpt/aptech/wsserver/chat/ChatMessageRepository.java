package fpt.aptech.wsserver.chat;

import fpt.aptech.wsserver.chatroom.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findByChatId(String chatId);

//    @Query("SELECT s FROM ChatMessage s WHERE s.chatId = :chatId")
//    public List<ChatMessage> findByChatId(String chatId);
}
