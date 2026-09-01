Add-Type -AssemblyName System.Drawing

$source = Join-Path $PSScriptRoot '..\Fotos bonistar'
$projectRoot = Join-Path $PSScriptRoot '..'
$targets = [ordered]@{
  '07-04.jpeg'              = 'public\images\hero\barco-cristalino.jpg'
  'asddas.jpg'              = 'public\images\hero\flutuacao-aerea.jpg'
  'DSC00334.jpg'            = 'public\images\hero\contemplacao-rio.jpg'
  'GOPR5071.jpg'            = 'public\images\hero\cardume-cristalino.jpg'
  'DSC00393.jpg'            = 'public\images\hero\cachoeira-viajante.jpg'
  'DJI_0344editada.jpg'     = 'public\images\story\rio-aereo.jpg'
  'G0101437.jpg'            = 'public\images\story\mergulho-solo.jpg'
  'G0011412.jpg'            = 'public\images\experiences\flutuacao-grupo.jpg'
  'IMG_1288.JPG'            = 'public\images\experiences\gruta-lago-azul.jpg'
  'DSC00321.jpg'            = 'public\images\experiences\cachoeira-caminho.jpg'
  'DJI_0386.jpg'            = 'public\images\experiences\nascente-aerea.jpg'
  '03-02.jpeg'              = 'public\images\story\piscina-natural.jpg'
  'DSC00349.jpg'            = 'public\images\story\aventura-circuito.jpg'
  'DJI_0370rede social.jpg' = 'public\images\story\rio-vertical.jpg'
  '_HGD2787.jpg'            = 'public\images\gallery\cardume.jpg'
  'DJI_0016.jpg'            = 'public\images\gallery\trilha-aventura.jpg'
  'DJI_0336.jpg'            = 'public\images\gallery\nascente-aberta.jpg'
  'DSC00298.jpg'            = 'public\images\gallery\casal-deck.jpg'
  'DSC00405.jpg'            = 'public\images\gallery\cachoeira-floresta.jpg'
  'DSC06183.jpg'            = 'public\images\gallery\deck-cristalino.jpg'
  'IMG_1292.JPG'            = 'public\images\gallery\cachoeira-intima.jpg'
  'IMG_1290.JPG'            = 'public\images\gallery\rio-esmeralda.jpg'
  'DSC00305.jpg'            = 'public\images\story\balneario-calmo.jpg'
  'IMG_1293.JPG'            = 'public\images\story\encontro-com-peixes.jpg'
  '08-11.jpeg'              = 'public\images\story\grupo-flutuacao.jpg'
  'DJI_0139editada.jpg'     = 'public\images\story\rio-final.jpg'
}

$qualityEncoder = [System.Drawing.Imaging.Encoder]::Quality
$jpgCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($qualityEncoder, 80L)

foreach ($entry in $targets.GetEnumerator()) {
  $sourcePath = Join-Path $source $entry.Key
  $targetPath = Join-Path $projectRoot $entry.Value
  New-Item -ItemType Directory -Force -Path (Split-Path $targetPath) | Out-Null
  $image = [System.Drawing.Image]::FromFile($sourcePath)
  try {
    $maxWidth = 1920.0
    $ratio = [Math]::Min(1.0, $maxWidth / [double]$image.Width)
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

    if ($entry.Value -like 'public\images\hero\*') {
      $mobileWidth = [Math]::Min(960, $image.Width)
      $mobileHeight = [int]($image.Height * ($mobileWidth / [double]$image.Width))
      $mobileBitmap = New-Object System.Drawing.Bitmap($mobileWidth, $mobileHeight)
      try {
        $mobileGraphics = [System.Drawing.Graphics]::FromImage($mobileBitmap)
        try {
          $mobileGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
          $mobileGraphics.DrawImage($image, 0, 0, $mobileWidth, $mobileHeight)
        } finally { $mobileGraphics.Dispose() }
        $mobilePath = $targetPath -replace '\.jpg$', '-960.jpg'
        $mobileBitmap.Save($mobilePath, $jpgCodec, $encoderParams)
      } finally { $mobileBitmap.Dispose() }
    }
  } finally { $image.Dispose() }
}

$brandDir = Join-Path $projectRoot 'public\images\brand'
New-Item -ItemType Directory -Force -Path $brandDir | Out-Null
Copy-Item -LiteralPath (Join-Path $source 'logo_bonistar3.png') -Destination (Join-Path $brandDir 'logo-bonistar.png') -Force

Write-Output "Prepared $($targets.Count) optimized photographs and the official logo."
