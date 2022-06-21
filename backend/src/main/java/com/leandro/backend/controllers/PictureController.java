package com.leandro.backend.controllers;

import com.leandro.backend.models.Picture;
import com.leandro.backend.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class PictureController {

    @Autowired
    private PictureService pictureService;

    @RequestMapping(value="api/upload/{idUser}", method=RequestMethod.POST)
    public String sendFile(@RequestParam("file") MultipartFile file, @PathVariable("idUser") String idUser) {
        String pictureUrl = "";
        try {
            byte[] fileBytes = file.getBytes();
            Picture pic = pictureService.uploadProfilePicture(fileBytes, file.getOriginalFilename(), idUser);
            pictureUrl = pic.getUrl();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return pictureUrl;
    }

    @RequestMapping(value="api/upload/deleteUserPicture/{idUser}", method= RequestMethod.POST)
    public String deleteUserPicture(@PathVariable String idUser){
        pictureService.deleteUserPicture(idUser);
        return "Ok";
    }
}
