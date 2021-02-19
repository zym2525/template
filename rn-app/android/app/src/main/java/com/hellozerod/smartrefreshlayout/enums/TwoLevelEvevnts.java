package com.hellozerod.smartrefreshlayout.enums;

public enum TwoLevelEvevnts {

    onTwoLevel(8);

    private int type = 1;

    TwoLevelEvevnts(int type) {
        this.type = type;
    }

    public int value() {
        return this.type;
    }

}
