"use client";
import { FacebookProvider, CustomChat } from 'react-facebook';

export default function FbMessenger() {
  return (
    <FacebookProvider appId="1015553676226678" chatSupport>
        <CustomChat pageId="176674278864017" minimized={true}/>
    </FacebookProvider>  
  )
}
