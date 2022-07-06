package com.leandro.backend.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import com.leandro.backend.models.User;
import com.leandro.backend.repository.UserRepository;
import com.leandro.backend.security.PasswordConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordConfig passwordConfig;
    @Lazy
    @Autowired
    private QuestionService questionService;
    @Lazy
    @Autowired
    private AnswerService answerService;
    @Lazy
    @Autowired
    private PictureService pictureService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("User not found in the database");
        }else{
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
        }
    }

    public User saveUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUser(String id){
        return userRepository.findById(id);
    }

    @Transactional
    public Optional<User> modifyPersonalDataUser(String idUser, String username, java.util.Date date){
        if(Objects.isNull(username)){
            userRepository.updateDob(idUser, date);
        }else if (Objects.isNull(date)) {
            userRepository.updateUsername(idUser, username);
        } else  if (!Objects.isNull(username) && !Objects.isNull(date)){
            userRepository.updateUsername(idUser, username);
            userRepository.updateDob(idUser, date);
        }
        return getUser(idUser);
    }

    @Transactional
    public Optional<User> modifyEmailAndPasswordUser(String idUser, String email, String password){
        if(Objects.isNull(email)){
            userRepository.updatePassword(idUser, passwordConfig.passwordEncoder().encode(password));
        }else if(Objects.isNull(password)){
            userRepository.updateEmail(idUser, email);
        }else if(!Objects.isNull(email) && !Objects.isNull(password)){
            userRepository.updateEmail(idUser, email);
            userRepository.updatePassword(idUser, passwordConfig.passwordEncoder().encode(password));
        }
        return getUser(idUser);
    }

    @Transactional
    public Optional<User> setPicturePublicIdAndPictureUrl(String id, String publicId, String url){
        userRepository.updatePicturePublicId(id, publicId!="" ? publicId : null);
        userRepository.updatePictureUrl(id, url!="" ? url : null);
        return getUser(id);
    }

    public String deleteUserAndAllHisInformation(String idUser){
        User user = getUser(idUser).get();
        answerService.deleteAllUserAnswer(user.getId());
        questionService.deleteAllUserQuestions(user.getId());
        pictureService.deleteUserPicture(user.getId());
        userRepository.deleteById(user.getId());
        return "The user has been deleted";
    }

}
