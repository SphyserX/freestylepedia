import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VideoPlayer from '../../src/components/trick/VideoPlayer.vue'

const mountPlayer = (videoId = 'abc') =>
  mount(VideoPlayer, { props: { videoId, title: 'Hawk Stop' } })

describe('VideoPlayer', () => {
  it('shows the YouTube frame right away, with no poster or play button of its own', () => {
    const w = mountPlayer()
    expect(w.find('button').exists()).toBe(false)
    expect(w.find('img').exists()).toBe(false)
    const src = w.get('iframe').attributes('src')!
    expect(src.startsWith('https://www.youtube-nocookie.com/embed/abc?')).toBe(true)
    expect(src).toContain('start=4')
    expect(w.get('iframe').attributes('title')).toBe('Hawk Stop')
  })

  it('leaves playback to YouTube: no autoplay and no player API', () => {
    const w = mountPlayer()
    const src = w.get('iframe').attributes('src')!
    expect(src).not.toContain('autoplay')
    expect(src).not.toContain('enablejsapi')
    expect(document.querySelector('script[src*="iframe_api"]')).toBeNull()
  })

  it('replaces the frame instead of changing its src when the video changes', async () => {
    const w = mountPlayer()
    const first = w.get('iframe').element
    await w.setProps({ videoId: 'def' })
    expect(w.get('iframe').element).not.toBe(first)
    expect(w.get('iframe').attributes('src')).toContain('/embed/def?')
  })
})
