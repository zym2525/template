package com.hellozerod.utils;

import java.util.HashMap;

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
