package com.leandro.backend.utils;

import com.leandro.backend.cloudinary.CloudinaryConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupComponent implements ApplicationRunner{

    @Autowired
    private CloudinaryConfig cloudinaryConfig;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if(cloudinaryConfig.notExistsDir()){
            cloudinaryConfig.createDirUpload();
        }
    }

}
