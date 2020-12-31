package com.hellozerod.smartrefreshlayout;

public enum Events {

    onStateChanged(1),

    onRefresh(2),

    onLoadMore(3);

    private int type = 1;

    Events(int type) {
        this.type = type;
    }

    public int value() {
        return this.type;
    }

}
