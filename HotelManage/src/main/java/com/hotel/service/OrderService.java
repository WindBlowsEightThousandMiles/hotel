package com.hotel.service;

import com.hotel.exception.ExceptionType;
import com.hotel.exception.HotelException;
import com.hotel.model.Order;
import com.hotel.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService
{
	@Autowired
	OrderRepository orderrepository;

	public List<Order> findAll()
	{
		return orderrepository.findAll();
	}

	public List<Order> findAllSortByOrderNo(){
		return orderrepository.findAll(new Sort(Sort.Direction.DESC, "orderno"));
	}

	public Order findByOrderNo(int orderNo) throws HotelException
	{
		for (Order order : orderrepository.findAll())
		{
			if(order.getOrderno() == orderNo)
			{
				return order;
			}
		}

		throw new HotelException(ExceptionType.ORDER_FIND_BY_ID_ERROR.getCode(),
				ExceptionType.ORDER_FIND_BY_ID_ERROR.getMsg());
	}

	public Order save(Order r)
	{
		return orderrepository.save(r);
	}

	public void delete(Order r)
	{
		orderrepository.delete(r);
	}
}
