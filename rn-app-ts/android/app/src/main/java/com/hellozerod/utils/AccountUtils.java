package com.hellozerod.utils;

import android.os.Build;

import java.util.HashMap;

import androidx.annotation.RequiresApi;

public class AccountUtils {

    public static HashMap<String, String> InfoMap = new HashMap<String, String>(){
        {
            put("username","");
        }
    };

    public static void setAccount(String username){
        InfoMap.put("username",username);
    }

    public static String getAccount() {
        return InfoMap.get("username");
    }
}
