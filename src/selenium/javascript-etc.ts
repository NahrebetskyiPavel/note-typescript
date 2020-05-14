import { Capabilities, Builder, WebDriver } from "selenium-webdriver"

import { sleep } from "../useful-functions"

class Driver {
  private driver!: WebDriver

  private setup = async (): Promise<void> => {
    const capabilities = Capabilities.chrome()
    this.driver = await new Builder().withCapabilities(capabilities).build()
  }

  private log = async (
    xpath: string,
    attribute = "innerHTML"
  ): Promise<void> => {
    const element = await this.driver.findElement({ xpath })
    const text = await element.getAttribute(attribute)
    console.log("text -> ", text)
  }

  // いろんな JavaScript の実行
  private doSomethingOnWikipedia = async (): Promise<void> => {
    await this.driver.get("https://ja.wikipedia.org/")

    // 最下部にスクロール
    const scriptA = "window.scrollTo(0, document.body.scrollHeight);"
    await this.driver.executeScript(scriptA)
    await sleep(3 * 1000)

    // 上がより見える方向にスクロール
    const scriptB = "window.scrollBy(0, -500);"
    await this.driver.executeScript(scriptB)
    await sleep(3 * 1000)

    // 下がより見える方向にスクロール
    const scriptC = "window.scrollBy(0, 500);"
    await this.driver.executeScript(scriptC)
    await sleep(3 * 1000)

    // 要素を除去
    const scriptD = "document.getElementById('footer').remove();"
    await this.driver.executeScript(scriptD)
    await sleep(3 * 1000)

    // アラートを出現、フォーカス、OKする
    const scriptE = "window.alert('こんにちは');"
    await this.driver.executeScript(scriptE)
    const alert = await this.driver.switchTo().alert()
    await alert.accept()
    await sleep(3 * 1000)
  }

  public main = async (): Promise<void> => {
    await this.setup()
    await this.doSomethingOnWikipedia()
  }
}

const driver = new Driver()
driver.main()
