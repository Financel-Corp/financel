/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { Container, Group, Anchor } from '@mantine/core'
import Image from 'next/image'

import classes from './ui/Footer.module.css'

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
]

interface FooterProps {
  className?: string
}

export function Footer({ className = '' }: FooterProps) {
  const items = links.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ))

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image src="/favicon.png" alt="Logo" width={60} height={60} />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  )
}
