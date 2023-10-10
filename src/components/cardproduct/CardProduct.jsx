import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,

} from "@material-tailwind/react";
import { Link } from 'react-router-dom';

export default function CardProduct() {
  return (

    <Card className="w-full max-w-[280px] max-h-[430] shadow-lg">
      
      <CardHeader floated={false} color="blue-gray">
        <Link to='/product-detail'>
         
          <img className='transition duration-300 ease-in-out hover:scale-110 '
            src="https://n2k.vn/wp-content/uploads/2022/07/9c81c98d8152580c0143-scaled.jpg"
            alt="ui/ux review check"
          />
         
        </Link>
      </CardHeader>
      
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            Giày Nike Air Force One All White Siêu Cấp
          </Typography>
        </div>
        <Typography color="gray">
          599.000₫
        </Typography>
        <CardFooter className="pt-3">
          <Button size="md" fullWidth={true} color='orange'>
            Thêm vào giỏ hàng
          </Button>
        </CardFooter>
      </CardBody>
    </Card>

  )
}
