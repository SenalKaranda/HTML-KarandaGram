import sys
import json
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QLineEdit, QPushButton

import os
import shutil
from PyQt5.QtWidgets import QFileDialog

class PostForm(QWidget):
  def __init__(self):
    super().__init__()

    self.initUI()

  def initUI(self):
    # Create input fields for each section of the JSON object
    writer_label = QLabel('Writer:', self)
    writer_label.move(20, 20)
    self.writer_field = QLineEdit(self)
    self.writer_field.move(100, 20)

    image_label = QLabel('Image:', self)
    image_label.move(20, 50)
    self.image_field = QLineEdit(self)
    self.image_field.move(100, 50)
    self.image_field.setReadOnly(True)

    image_button = QPushButton('Upload Image', self)
    image_button.move(220, 50)
    image_button.clicked.connect(self.uploadImage)

    caption_label = QLabel('Caption:', self)
    caption_label.move(20, 80)
    self.caption_field = QLineEdit(self)
    self.caption_field.move(100, 80)

    content_label = QLabel('Content:', self)
    content_label.move(20, 110)
    self.content_field = QLineEdit(self)
    self.content_field.move(100, 110)

    date_label = QLabel('Date:', self)
    date_label.move(20, 140)
    self.date_field = QLineEdit(self)
    self.date_field.move(100, 140)

    # Create a button to submit the form
    submit_button = QPushButton('Submit', self)
    submit_button.move(20, 170)
    submit_button.clicked.connect(self.submitForm)

    # Set the size and title of the window
    self.setGeometry(100, 100, 400, 200)
    self.setWindowTitle('Post Form')

  def uploadImage(self):
    # Open a file dialog to select an image file
    options = QFileDialog.Options()
    options |= QFileDialog.DontUseNativeDialog
    file_name, _ = QFileDialog.getOpenFileName(self, 'Select Image', '', 'Image Files (*.png *.jpg *.jpeg *.gif)', options=options)

    # Copy the selected file to the "images/" folder
    if file_name:
      image_name = os.path.basename(file_name)
      shutil.copy(file_name, f'images/{image_name}')
      self.image_field.setText(image_name)

  def submitForm(self):
    # Read the current contents of the "posts.json" file
    with open('data/posts.json', 'r') as f:
      posts = json.load(f)

    # Create a new JSON object with the form data
    new_post = {
      'writer': self.writer_field.text(),
      'image': f'images/{self.image_field.text()}',
      'caption': self.caption_field.text(),
      'content': self.content_field.text(),
      'date': self.date_field.text()
    }

    # Add the new post to the beginning of the array
    posts.insert(0, new_post)

    # Write the updated JSON object back to the file
    with open('data/posts.json', 'w') as f:
      json.dump(posts, f)

    # Clear the input fields
    self.writer_field.setText('')
    self.image_field.setText('')
    self.caption_field.setText('')
    self.content_field.setText('')
    self.date_field.setText('')


if __name__ == '__main__':
  app = QApplication(sys.argv)
  post_form = PostForm()
  post_form.show()
  sys.exit(app.exec_())
