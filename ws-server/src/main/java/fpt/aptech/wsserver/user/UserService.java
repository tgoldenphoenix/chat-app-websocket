package fpt.aptech.wsserver.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // saving == connecting user
    public void saveUser(User user) {

//        user.setStatus(Status.ONLINE);

        User oldStudent = userRepository.findById(user.getNickName()).get();
        oldStudent.setStatus(Status.ONLINE);

        // nếu dung only this line thi se update all properties
        userRepository.save(oldStudent);
    }
}
