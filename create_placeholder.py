from PIL import Image, ImageDraw

def create_placeholder(filename, text="Member", color=(200, 200, 200)):
    img = Image.new('RGB', (400, 400), color=color)
    d = ImageDraw.Draw(img)
    # Save the image
    img.save(filename)

create_placeholder("assets/member-placeholder.jpg")
