import React, { useState } from 'react'
import Avatar from "react-avatar-edit";
import IconQuitCross from '../icons/IconQuitCross';
import { updateAvatarUserByID } from '../../api/UserApi';
import { UpdateError, UpdateSuccessReload } from '../alert';
import { encryptStorage } from '../../utils/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ChangeAvatarModal({ isOpen02, user }) {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(null);
    
    const onClose = () => {
      setPreview(null);
    };
    
    const onCrop = (view) => {
      setPreview(view);
    };
    
    const handleSubmit = async () => {
      // Check if preview URL exists
      if (!preview) {
        return;
      }
    
      // Fetch image from preview URL
      const imageResponse = await fetch(preview);
      const imageBlob = await imageResponse.blob();
    
      // Create FormData object with image file
      const data = new FormData();
      data.append('file', imageBlob, 'croppedImage.jpg');
    
      // Submit form data to server
      const wait = toast.loading('Vui lòng chờ...');
      const res = await updateAvatarUserByID(data, user.id);
      toast.dismiss(wait);
    
      // Handle server response
      if (res.data.success) {
        encryptStorage.setItem('avatar', JSON.stringify(res.data.data.avatar));
        UpdateSuccessReload(wait, 'Đổi ảnh đại diện thành công', true);
        isOpen02(false);
      } else {
        UpdateError(wait, 'Đổi ảnh đại diện thất bại');
      }
    };
  
    return (
      <div
        className=" z-[1000] bg-black bg-opacity-40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 w-full md:inset-0 h-modal md:h-full justify-center items-center flex "
        aria-modal="true"
        role="dialog"
      >
        <div className="relative w-full h-full max-w-2xl p-4 md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 mx-10 border-b rounded-t border-slate-300 dark:border-gray-600">
              <div className="text-xl text-gray-900 dark:text-white">
                Cập nhật ảnh đại diện
              </div>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => isOpen02(false)}
              >
                <IconQuitCross></IconQuitCross>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-center m-4 bg-gray h-96 p-7">
                <Avatar
                  width={500}
                  height={300}
                  onClose={onClose}
                  onCrop={onCrop}
                  src={src}
                  
                />
              </div>
            </div>
            <div className="flex items-center justify-center p-6 mx-10 space-x-2 border-t rounded-b border-slate-300 dark:border-gray-600">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSubmit}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

