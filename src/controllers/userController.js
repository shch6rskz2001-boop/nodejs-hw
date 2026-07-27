const user = await User.findByIdAndUpdate(
  req.user._id,
  { avatar: result.secure_url },
  { returnDocument: 'after' },
);