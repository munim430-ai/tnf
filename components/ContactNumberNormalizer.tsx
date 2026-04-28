'use client'

import { useEffect } from 'react'

export default function ContactNumberNormalizer() {
  useEffect(() => {
    const fixContacts = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((a) => {
        const href = a.getAttribute('href') || ''
        if (href.includes('wa.me')) a.setAttribute('href', 'https://wa.me/8801632796650')
        if (href.startsWith('tel:')) a.setAttribute('href', 'tel:+8801632796650')
      })

      const wrong = ['+880 1700 000000', '+8801700000000', '8801700000000', '1700 000000']
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      const nodes: Node[] = []
      while (walker.nextNode()) nodes.push(walker.currentNode)

      nodes.forEach((node) => {
        let text = node.nodeValue || ''
        wrong.forEach((n) => {
          text = text.replaceAll(n, '+880 1632-796650')
        })
        node.nodeValue = text
      })
    }

    fixContacts()
    const timer = window.setTimeout(fixContacts, 1000)
    return () => window.clearTimeout(timer)
  }, [])

  return null
}
