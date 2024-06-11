---
name: Coding
tools: [C#, Html, Markdown]
image: https://raw.githubusercontent.com/Seerow0/-MK-II-Nicholas-J-Website-/main/gifs/code-frustration(2).gif
description: Some general coding I have used in games, created new scripts and modified existing scripts.
---

* TOC
{:toc}

# Camera Collision (Modified)

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//How to use
//Create an empty game object, call it "CameraBase" and then add the component - "Camera Follow" to it.
//Create another empty game object and parent/place it on the hips/pelvis bone of your character/player
//Then parent the MainCamera to this object and apply the "CameraCollision" to the camera. 

[AddComponentMenu("Filmstorm/Camera Collision")]
public class CameraCollision : MonoBehaviour {

	public float minDistance = 1.0f;
	public float maxDistance = 5.0f;
	public float smooth = 10.0f;
	Vector3 dollyDir;
	public Vector3 dollyDirAdjusted;
	public float distance;

	// Use this for initialization
	void Awake () {
		dollyDir = transform.localPosition.normalized;
		distance = transform.localPosition.magnitude;
	}

	// Update is called once per frame
	void Update () {

		Vector3 desiredCameraPos = transform.parent.TransformPoint (dollyDir * maxDistance);
		RaycastHit hit;

		if (Physics.Linecast (transform.parent.position, desiredCameraPos, out hit)) {
			distance = Mathf.Clamp ((hit.distance * 0.87f), minDistance, maxDistance);

		} else {
			distance = maxDistance;
		}

		transform.localPosition = Vector3.Lerp (transform.localPosition, dollyDir * distance, Time.deltaTime * smooth);
	}
}

------------------------------------------

# Camera Follow (Modified)

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//How to use
//Create an empty game object, call it "CameraBase" and then add this component - "Camera Follow" to it.
//Create another empty game object and parent/place it on the hips/pelvis bone of your character/player
//Then parent the MainCamera to this object and apply the "CameraCollision" to the camera. 

[AddComponentMenu("Filmstorm/Camera Follow")]
public class CameraFollow : MonoBehaviour {
	[Header("Drag the Object you want to follow here")]
	[Space(5)]
	[Tooltip("The best way to use this is to create an empty gameobject and parent it to your players hip/pelvis bone.")]
	public GameObject CameraFollowObj;

	[Header("Adjust these values to how you want the camera to rotate")]
	[Space(5)]
	public float CameraMoveSpeed = 120.0f;
	public float clampAngle = 80.0f;
	public float inputSensitivity = 150.0f;

	Vector3 FollowPOS;
	GameObject CameraObj;
	GameObject PlayerObj;
	float camDistanceXToPlayer;
	float camDistanceYToPlayer;
	float camDistanceZToPlayer;
	float mouseX;
	float mouseY;
	float finalInputX;
	float finalInputZ;
	float smoothX;
	float smoothY;
	float rotY = 0.0f;
	float rotX = 0.0f;
	float inputX;
	float inputZ;
	GameObject player;



	// Use this for initialization
	void Start () {
		player = GameObject.FindGameObjectWithTag ("Player");
		Vector3 rot = transform.localRotation.eulerAngles;
		rotY = rot.y;
		rotX = rot.x;
		Cursor.lockState = CursorLockMode.Locked;
		Cursor.visible = false;

	}

	// Update is called once per frame
	void Update () {

		// We setup the rotation of the sticks here
		//inputX = Input.GetAxis ("RightStickHorizontal");
		//inputZ = Input.GetAxis ("RightStickVertical");
		//mouseX = Input.GetAxis ("Mouse X");
		//mouseY = Input.GetAxis ("Mouse Y");
		//finalInputX = inputX + mouseX;
		//finalInputZ = inputZ + mouseY;

		//rotY += finalInputX * inputSensitivity * Time.deltaTime;
		//rotX += finalInputZ * inputSensitivity * Time.deltaTime;

		//rotX = Mathf.Clamp (rotX, -clampAngle, clampAngle);

		//Quaternion localRotation = Quaternion.Euler (rotX, rotY, 0.0f);
		//transform.rotation = localRotation;



	}

	void LateUpdate () {
		CameraUpdater ();
	}

	void CameraUpdater() {
		// set the target object to follow
		Transform target = CameraFollowObj.transform;

		//move towards the game object that is the target
		float step = CameraMoveSpeed * Time.deltaTime;
		transform.position = Vector3.MoveTowards (transform.position, target.position, step);
	}
}

---------------------------------------
# change music volume 
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; 


public class ChangeMusicVolume : MonoBehaviour {



	public Slider Volume;
	public AudioSource myMusic;
	
	// Update is called once per frame
	void Update () {
		myMusic.volume = Volume.value;
	}
}

---------------------------------------

# Destroy By Time

using UnityEngine;
using System.Collections;

public class DestroyByTime : MonoBehaviour
{
    public float lifetime;

    void Start()
    {
        Destroy(gameObject, lifetime);
    }
} 

------------------

# Mouse Orbit (Modified)

using UnityEngine;
using System.Collections;

[AddComponentMenu("Camera-Control/Mouse Orbit with zoom")]
public class MouseOrbitImproved : MonoBehaviour {

	public Transform target;
	public float distance = 5.0f;
	public float xSpeed = 120.0f;
	public float ySpeed = 120.0f;

	public float yMinLimit = -20f;
	public float yMaxLimit = 80f;

	public float distanceMin = .5f;
	public float distanceMax = 15f;

	private Rigidbody rigidbody;

	float x = 0.0f;
	float y = 0.0f;

	// Use this for initialization
	void Start () 
	{
		Vector3 angles = transform.eulerAngles;
		x = angles.y;
		y = angles.x;

		rigidbody = GetComponent<Rigidbody>();

		// Make the rigid body not change rotation
		if (rigidbody != null)
		{
			rigidbody.freezeRotation = true;
		}
	}

	void LateUpdate () 
	{
		if (target) 
		{
			x += Input.GetAxis("Mouse X") * xSpeed * distance * 0.02f;
			y -= Input.GetAxis("Mouse Y") * ySpeed * 0.02f;

			y = ClampAngle(y, yMinLimit, yMaxLimit);

			Quaternion rotation = Quaternion.Euler(y, x, 0);

			distance = Mathf.Clamp(distance - Input.GetAxis("Mouse ScrollWheel")*5, distanceMin, distanceMax);

			RaycastHit hit;
			if (Physics.Linecast (target.position, transform.position, out hit)) 
			{
				distance -=  hit.distance;
			}
			Vector3 negDistance = new Vector3(0.0f, 0.0f, -distance);
			Vector3 position = rotation * negDistance + target.position;

			transform.rotation = rotation;
			transform.position = position;
		}
	}

	public static float ClampAngle(float angle, float min, float max)
	{
		if (angle < -360F)
			angle += 360F;
		if (angle > 360F)
			angle -= 360F;
		return Mathf.Clamp(angle, min, max);
	}
}

------------

# On Trigger

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OnTrigger : MonoBehaviour {


	public KeyCode MyKey;
	public string MyTrigger;

	void Update ()
	{
		if (Input.GetKey (MyKey)) {
			GetComponent<Animator> ().SetTrigger (MyTrigger);
		}
	}
}

---------------------------

# Pause Menu

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PauseMenu : MonoBehaviour {

	public static bool gameispaused = false;

	public GameObject pauseMenuUI;
	// Update is called once per frame
	void Update () {

		if (Input.GetKeyDown(KeyCode.Escape))
			
		{
	if (gameispaused)
				
	{
		Resume();

	} else 
	{
		Pause();
}
			//Screen.lockCursor = false;
			//Screen.lockCursor = true;
}

}
public void Resume()
{
	pauseMenuUI.SetActive(false);
	Time.timeScale = 1f;
	gameispaused = false;
	Screen.lockCursor = true;
}
void Pause ()

{
	pauseMenuUI.SetActive(true);
	Time.timeScale = 0f;
	gameispaused = true; 
	Screen.lockCursor = false;
	
}
	public void LoadMenu()
	{
		Time.timeScale = 1f; 
		SceneManager.LoadScene ("Menu");
	}
	public void QuitGame()
	{
		Debug.Log("Quitting game...");
		Application.Quit ();
	}
}

--------------------

# PlaySoundOnPress

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlaySoundOnPress : MonoBehaviour
{
    public AudioSource someSound;
    // Use this for initialization
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.U))
        {
            someSound.Play();
        }
    }
}

# Roll

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Roll : MonoBehaviour {
//	public Animator anim;
//	// Use this for initialization
//	void Start () {
//		anim = GetComponent<Animator> ();
//	}
//	
//	// Update is called once per frame
//	void Update () {
//		if (Input.GetKeyDown ("1"));
//		{
//			anim.Play ("roll");
//		}
//	}
//}
	public bool roll;


	void Start()
	{
		roll = false;
	}

	void Update()
	{
		if (Input.GetButton("1"))
		{
			roll = true;
		}
		else
		{
			roll = false;
		}
	}
}

----------------

# Splash Sequence

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SplashSequence : MonoBehaviour {

	public static int SceneNumber;
	// Use this for initialization
	void Start () {
		if (SceneNumber == 0) {
			StartCoroutine (ToSplashTwo());
	}
		if (SceneNumber == 1) {
			StartCoroutine (ToMainMenu ());
		}

	}
	IEnumerator ToSplashTwo () {
		yield return new WaitForSeconds (5);
		SceneNumber = 1;
		SceneManager.LoadScene (1);
	}
	IEnumerator ToMainMenu () {
		yield return new WaitForSeconds (5);
		SceneNumber = 2;
			SceneManager.LoadScene (2);
}
}

-----
 # Death Trigger

 

  using UnityEngine;
using System.Collections;

public class deathtrigger : MonoBehaviour


{

    public bool death;
    private GameObject player;
    private Animator anim;
    private AudioClip sound;

    // Use this for initialization
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
        anim = GetComponent<Animator>();
    }

    void OnTriggerEnter(Collider other)
    {
        anim.SetBool("death", true);
        GetComponent<AudioSource>().Play();
    }

    void OnTriggerExit(Collider other)
    {
        anim.SetBool("death", false);
    }
}

--------------

# Detect Hit

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class detecthit : MonoBehaviour {
    // public SimpleHealthBar healthBar;
    public Slider healthbar;
   Animator anim;


    void OnTriggerEnter(Collider other)
    {
        //Debug.Log("Hit");
        //healthBar.UpdateBar(90,100);//100-90 is 10 damage//90,100//
        //if (healthBar.UpdateBar(90,100)) ;
        healthbar.value -= 2;
        if(healthbar.value <=0)
        anim.SetBool("death", true);
      // healthbar.value -= 20;

       
    }

    void Start()
    {
        anim = GetComponent<Animator>();
    }
    void Update()
    {

    }
}

----------

# Don't Destroy

using System.Collections;

using UnityEngine;

public class dontdestroy : MonoBehaviour {

    void Awake()
    {
        GameObject[] objs = GameObject.FindGameObjectsWithTag("music");
        if (objs.Length > 1)
            Destroy(this.gameObject);
            DontDestroyOnLoad(this.gameObject);

    }
}
------
# Main Menu

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class mainmenu : MonoBehaviour {

	public void PlayGame ()
	{ 
SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex + 1);
}



	public void QuitGame ()
	{
		Debug.Log ("QuitGame!");
		Application.Quit ();
	}

}

------

# reload/die

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class reloaddie : MonoBehaviour
{




    void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.tag == "spikes")
        {
            SceneManager.LoadScene("Official2");
            //Or:
            //SceneManager.LoadScene (SceneIndex); //(without these: ", because it's a number - an int, not a string)
        }
    }
}

-----
#Reloaddie1
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class reloaddie1 : MonoBehaviour
{




    void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.tag == "final")
        {
            SceneManager.LoadScene("FinalScene");
            //Or:
            //SceneManager.LoadScene (SceneIndex); //(without these: ", because it's a number - an int, not a string)
        }
    }
}

------

# Respawn

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class respawn : MonoBehaviour {


		[SerializeField]private Transform player;
		[SerializeField]private Transform respawnPoint;

		void OnTriggerEnter(Collider other)
	{
		

			player.transform.position = respawnPoint.transform.position;
		}
	}

 -----
 # Test Death On Animation

 using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class tst : MonoBehaviour
{
    public Animator anim;
    private void OnTriggerStay(Collider other)
    {
        if (other.gameObject.tag == "Player")
            anim.SetBool("death", true);
    }
}
<p class="text-center">
{% include elements/button.html link="https://nicholasjonathan.com/projects/" text="Previous Page" %}
