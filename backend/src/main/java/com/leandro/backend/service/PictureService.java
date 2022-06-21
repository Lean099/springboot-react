package com.leandro.backend.service;

import com.cloudinary.utils.ObjectUtils;
import com.leandro.backend.cloudinary.CloudinaryConfig;
import com.leandro.backend.models.Picture;
import com.leandro.backend.models.User;
import com.leandro.backend.repository.PictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class PictureService{

    @Autowired
    private PictureRepository pictureRepository;
    @Autowired
    private CloudinaryConfig cloudinaryConfig;
    @Autowired
    private UserService userService;

    // Subir - Guardar info db
    public Picture uploadProfilePicture(byte[] fileBytes, String originalFilename, String idUser){
        cloudinaryConfig.writeFileToUploadFolder(fileBytes, originalFilename);
        Boolean hasAPicture = hasAPicture(idUser);
        if(hasAPicture){
            String prevPicPublicId = userService.getUser(idUser).get().getPicturePublicId();
            try {
                cloudinaryConfig.cloudinaryConfig().uploader().destroy(prevPicPublicId, ObjectUtils.emptyMap());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        Map infoFile = cloudinaryConfig.uploadFile(originalFilename);
        cloudinaryConfig.deleteFileInUploadFolder();
        Picture newPicture = new Picture();
        newPicture.setPublicId((String) infoFile.get("public_id"));
        newPicture.setFilename((String) infoFile.get("original_filename"));
        newPicture.setFormat((String) infoFile.get("format"));
        newPicture.setUrl((String) infoFile.get("url"));
        newPicture.setSize((Integer) infoFile.get("bytes"));
        Picture pic = pictureRepository.save(newPicture);
        userService.setPicturePublicIdAndPictureUrl(idUser, pic.getPublicId(), pic.getUrl());
        return pic;
    }

    // Buscar foto
    public Picture findProfilePicture(String idUser){
        Optional<User> user = userService.getUser(idUser);
        if(user.isPresent()){
            return pictureRepository.findByPublicId(user.get().getPicturePublicId()).get();
        }else{
            return null;
        }
    }

    // Borrar
    public void deleteUserPicture(String idUser){
        Optional<User> user = userService.getUser(idUser);
        if(user.isPresent()){
            if(!user.get().getPicturePublicId().isBlank()){
                Optional<Picture> pic = pictureRepository.findByPublicId(user.get().getPicturePublicId());
                try {
                    cloudinaryConfig.cloudinaryConfig().uploader().destroy(pic.get().getPublicId(), ObjectUtils.emptyMap());
                } catch (Exception e) {
                    e.printStackTrace();
                }
                pictureRepository.deleteById(pic.get().getId());
                userService.setPicturePublicIdAndPictureUrl(idUser, "", "");
            }
        }
    }

    public Boolean hasAPicture(String idUser){
        Optional<User> user = userService.getUser(idUser);
        String publicId = user.get().getPicturePublicId();
        if(publicId == null){
            return false;
        }else{
            Optional<Picture> picture = pictureRepository.findByPublicId(publicId);
            if(picture.get().getPublicId() == publicId){
                return true;
            }
            return false;
        }
    }

}
