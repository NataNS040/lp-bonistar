Add-Type -AssemblyName System.Drawing

$source = Join-Path $PSScriptRoot '..\Fotos bonistar'
$targets = @{
  '07-04.jpeg'       = 'public\images\hero\bonito-aguas-cristalinas.jpg'
  'rede social.jpeg' = 'public\images\destino\nascente-aerea.jpg'
  'IMG_1289.JPG'     = 'public\images\destino\peixes-submersos.jpg'
  '03-02.jpeg'       = 'public\images\destino\banho-cristalino.jpg'
  'IMG_1290.JPG'     = 'public\images\destino\rio-cristalino.jpg'
  '03-02.jpeg '      = 'public\images\destino\final-rio-cristalino.jpg'
  '08-11.jpeg'       = 'public\images\experiencias\flutuacao-grupo.jpg'
  'IMG_1288.JPG'     = 'public\images\experiencias\gruta-lago-azul.jpg'
  'IMG_1292.JPG'     = 'public\images\experiencias\cachoeira.jpg'
  'IMG_1291.JPG'     = 'public\images\experiencias\rio-cristalino.jpg'
  'IMG_1293.JPG'     = 'public\images\experiencias\flutuacao-peixes.jpg'
  '07-04.jpeg '      = 'public\images\experiencias\barco-rio.jpg'
}

$qualityEncoder = [System.Drawing.Imaging.Encoder]::Quality
$jpgCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($qualityEncoder, 82L)

foreach ($entry in $targets.GetEnumerator()) {
  $sourceName = $entry.Key.TrimEnd()
  $sourcePath = Join-Path $source $sourceName
  $targetPath = Join-Path (Join-Path $PSScriptRoot '..') $entry.Value
  $targetDir = Split-Path $targetPath
  New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
  $image = [System.Drawing.Image]::FromFile($sourcePath)
  try {
    $maxWidth = 1600
    $ratio = [Math]::Min(1, $maxWidth / $image.Width)
    $width = [int]($image.Width * $ratio)
    $height = [int]($image.Height * $ratio)
    $bitmap = New-Object System.Drawing.Bitmap($width, $height)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($image, 0, 0, $width, $height)
      } finally { $graphics.Dispose() }
      $bitmap.Save($targetPath, $jpgCodec, $encoderParams)
    } finally { $bitmap.Dispose() }
  } finally { $image.Dispose() }
}

Write-Output "Prepared $($targets.Count) optimized image assets."
