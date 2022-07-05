import React from 'react';

export default function FollowFurriend() {
  return (
    <>
      {/* <!-- The button to open modal --> */}
      <label
        htmlFor='follow-furriend-modal'
        className='btn btn-ghost normal modal-button'
      >
        Follow a furriend
      </label>
      {/* <!-- The modal --> */}
      <input
        type='checkbox'
        id='follow-furriend-modal'
        className='modal-toggle'
      />
      <div className='modal'>
        <div className='modal-box relative w-11/12 max-w-5xl'>
          <label
            htmlFor='follow-furriend-modal'
            className='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <h3 className='font-bold text-lg'>Furriends</h3>
          <p className='py-4'>Meet new Furriends and set up a playdate!</p>

          {/* THIS IS THE TABLE OF FURRIENDS VVV */}
          {/*  */}
          <div class='overflow-x-auto w-full'>
            <table class='table w-full'>
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type='checkbox' class='checkbox' />
                    </label>
                  </th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}
                <tr>
                  <th>
                    <label>
                      <input type='checkbox' class='checkbox' />
                    </label>
                  </th>
                  <td>
                    <div class='flex items-center space-x-3'>
                      <div class='avatar'>
                        <div class='mask mask-squircle w-12 h-12'>
                          <img
                            src='/tailwind-css-component-profile-2@56w.png'
                            alt='Avatar Tailwind CSS Component'
                          />
                        </div>
                      </div>
                      <div>
                        <div class='font-bold'>Hart Hagerty</div>
                        <div class='text-sm opacity-50'>United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Zemlak, Daniel and Leannon
                    <br />
                    <span class='badge badge-ghost badge-sm'>
                      Desktop Support Technician
                    </span>
                  </td>
                  <td>Purple</td>
                  <th>
                    <button class='btn btn-ghost btn-xs'>details</button>
                  </th>
                </tr>
                {/* <!-- row 2 --> */}
                <tr>
                  <th>
                    <label>
                      <input type='checkbox' class='checkbox' />
                    </label>
                  </th>
                  <td>
                    <div class='flex items-center space-x-3'>
                      <div class='avatar'>
                        <div class='mask mask-squircle w-12 h-12'>
                          <img
                            src='/tailwind-css-component-profile-3@56w.png'
                            alt='Avatar Tailwind CSS Component'
                          />
                        </div>
                      </div>
                      <div>
                        <div class='font-bold'>Brice Swyre</div>
                        <div class='text-sm opacity-50'>China</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Carroll Group
                    <br />
                    <span class='badge badge-ghost badge-sm'>
                      Tax Accountant
                    </span>
                  </td>
                  <td>Red</td>
                  <th>
                    <button class='btn btn-ghost btn-xs'>details</button>
                  </th>
                </tr>
                {/* <!-- row 3 --> */}
                <tr>
                  <th>
                    <label>
                      <input type='checkbox' class='checkbox' />
                    </label>
                  </th>
                  <td>
                    <div class='flex items-center space-x-3'>
                      <div class='avatar'>
                        <div class='mask mask-squircle w-12 h-12'>
                          <img
                            src='/tailwind-css-component-profile-4@56w.png'
                            alt='Avatar Tailwind CSS Component'
                          />
                        </div>
                      </div>
                      <div>
                        <div class='font-bold'>Marjy Ferencz</div>
                        <div class='text-sm opacity-50'>Russia</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Rowe-Schoen
                    <br />
                    <span class='badge badge-ghost badge-sm'>
                      Office Assistant I
                    </span>
                  </td>
                  <td>Crimson</td>
                  <th>
                    <button class='btn btn-ghost btn-xs'>details</button>
                  </th>
                </tr>
              </tbody>
              {/* <!-- foot --> */}
              <tfoot>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>

          {/*  */}
          {/* THIS IS THE TABLE OF FURRIENDS ^^^ */}

          <div className='modal-action'>
            <label htmlFor='follow-furriend-modal' className='btn'>
              Done
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
