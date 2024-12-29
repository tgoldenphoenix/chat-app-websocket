package fpt.aptech.wsserver.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    // saving == connecting user
    public void saveUser(User user) {

//        user.setStatus(Status.ONLINE);

        User oldStudent = repository.findById(user.getNickName()).get();
        oldStudent.setStatus(Status.ONLINE);

        // nếu dung only this line thi se update all properties
        repository.save(oldStudent);
        System.out.println("update status thanh cong");
    }

    public void disconnect(User user) {
        var storedUser = repository.findById(user.getNickName()).orElse(null);
        if (storedUser != null) {
            storedUser.setStatus(Status.OFFLINE);
            repository.save(storedUser);
        }
    }

    public List<User> findConnectedUsers() {
        return repository.findByStatus(Status.ONLINE);
    }
}
