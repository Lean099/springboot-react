package com.leandro.backend.service;

import com.leandro.backend.models.User;
import com.leandro.backend.repository.UserRepository;
import com.leandro.backend.security.PasswordConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordConfig passwordConfig;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUser(String id){
        return userRepository.findById(id);
    }

    @Transactional
    public Optional<User> modifyPersonalDataUser(String idUser, String name, Integer age){
        if(name.isBlank()){
            userRepository.updateAge(idUser, age);
        }else if (age == null) {
            userRepository.updateName(idUser, name);
        } else  if (!name.isBlank() && age != null){
            userRepository.updateName(idUser, name);
            userRepository.updateAge(idUser, age);
        }
        return getUser(idUser);
    }

    @Transactional
    public Optional<User> modifyEmailAndPasswordUser(String idUser, String email, String password){
        if(email.isBlank()){
            userRepository.updatePassword(idUser, passwordConfig.passwordEncoder().encode(password));
        }else if(password.isBlank()){
            userRepository.updateEmail(idUser, email);
        }else if(!email.isBlank() && !password.isBlank()){
            userRepository.updateEmail(idUser, email);
            userRepository.updatePassword(idUser, passwordConfig.passwordEncoder().encode(password));
        }
        return getUser(idUser);
    }

}
