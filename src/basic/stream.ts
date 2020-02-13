import * as path from "path"
import { readFileSync, createReadStream } from "fs"

const expandTilde = (filePath: string): string => {
  if (filePath[0] === "~" && typeof process.env.HOME === "string") {
    return path.join(process.env.HOME, filePath.slice(1))
  }
  return filePath
}

// ダミーデータ作成サービスで作ったデータ
const aPath = "~/Projects/note-typescript/assets/users.csv"

{
  // 完全にファイルを読み込んでから、出力している
  // 仮にWEBサービスの中で、ユーザのリクエストから以下の処理が行われると
  // 読み込み中は、他のリクエストをさばけないらしい
  const data = readFileSync(expandTilde(aPath))
  console.log(data)
}
{
  // 一定量読みつつ、読んだ分から出力しているような処理になっているとのこと
  // ReadStream -> WriteStream に接続しているのでパイプという名前「|」のこと
  const stream = createReadStream(expandTilde(aPath))
  stream.pipe(process.stdout)
}