package com.hotel.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "standard")
public class Standard
{
    @Id
    private int stdno;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "type")
    private List<Room> rooms;

    @Column(name = "stdname")
    private String stdname;

    @Column(name = "roomarea")
    private int roomerea;

    @Column(name = "bedno")
    private int bedno;

    @Column(name = "equip1")
    private String equip1;

    @Column(name = "equip2")
    private String equip2;

    public int getStdno() {
        return stdno;
    }

    public void setStdno(int stdno) {
        this.stdno = stdno;
    }

    public String getStdname() {
        return stdname;
    }

    public void setStdname(String stdname) {
        this.stdname = stdname;
    }

    public int getRoomerea() {
        return roomerea;
    }

    public void setRoomerea(int roomerea) {
        this.roomerea = roomerea;
    }

    public int getBedno() {
        return bedno;
    }

    public void setBedno(int bedno) {
        this.bedno = bedno;
    }

    public String getEquip1() {
        return equip1;
    }

    public void setEquip1(String equip1) {
        this.equip1 = equip1;
    }

    public String getEquip2() {
        return equip2;
    }

    public void setEquip2(String equip2) {
        this.equip2 = equip2;
    }

    @Override
    public String toString() {
        return "Standard{" +
                "stdno=" + stdno +
                ", rooms=" + rooms +
                ", stdname='" + stdname + '\'' +
                ", roomerea=" + roomerea +
                ", bedno=" + bedno +
                ", equip1='" + equip1 + '\'' +
                ", equip2='" + equip2 + '\'' +
                '}';
    }
}
