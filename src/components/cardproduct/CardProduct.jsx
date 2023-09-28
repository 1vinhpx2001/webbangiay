import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
  } from "@material-tailwind/react";

export default function CardProduct() {
    return (
        <Card className="w-full max-w-[280px] max-h-[430] shadow-lg">
        <CardHeader floated={false} color="blue-gray">
          <img className='transition duration-300 ease-in-out hover:scale-110 '
            src="https://n2k.vn/wp-content/uploads/2022/07/9c81c98d8152580c0143-scaled.jpg"
            alt="ui/ux review check"
          />
          {/* <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" /> */}
          {/* <IconButton
            size="sm"
            color="red"
            variant="text"
            className="!absolute top-4 right-4 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </IconButton> */}
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
        </CardBody>
      </Card>
    )
}
