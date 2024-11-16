import { Title } from '@mantine/core'
import Image from 'next/image'

import { GuestButtonWrapper } from './GuestButtonWrapper'

import classes from './ui/Header.module.css'

export function Header() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.imageContainer}>
        <Image
          src="/loginHeader.webp"
          alt="Financel"
          sizes="(max-width: 600px) 90vw, 400px"
          quality={50}
          priority
          fill
          loading="eager"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,BASE64_BLUR_HERE"
          style={{
            width: '100%',
            contentVisibility: 'auto',
            display: 'block',
            objectFit: 'cover',
            backgroundColor: '#f0f0f0',
          }}
        />
      </div>

      <div className={classes.inner}>
        <Title className={classes.title}>Financle</Title>

        <div className={classes.buttonContainer}>
          <GuestButtonWrapper />
        </div>
      </div>
    </div>
  )
}
