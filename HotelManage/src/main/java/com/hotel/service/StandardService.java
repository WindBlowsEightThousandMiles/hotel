package com.hotel.service;

import com.hotel.exception.ExceptionType;
import com.hotel.exception.HotelException;
import com.hotel.model.Standard;
import com.hotel.repository.StandardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StandardService
{
    @Autowired
    private StandardRepository standardrespository;

    public List<Standard> getAll() {
        return (List<Standard>) standardrespository.findAll();
    }

    public Standard findByStandard(int stdno) throws HotelException{
        Standard standard = standardrespository.findById(stdno).orElse(null);
        if (standard!=null){
            return standard;
        }else {
            throw new HotelException(ExceptionType.STANDARD_FIND_BY_STDNO_ERROR.getCode(),
                    ExceptionType.STANDARD_FIND_BY_STDNO_ERROR.getMsg());
        }
    }

    public Standard save(Standard s){
        return standardrespository.save(s);
    }

    public void delete(Standard s){
        standardrespository.delete(s);
    }
}
